/**
 * DO NOT MODIFY THIS FILE.
 *
 * Portal Just SOAP integration. This file handles the low-level SOAP
 * communication and XML parsing. All business logic is in lawsuits.service.ts.
 */
/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-argument */
import { Injectable, Logger } from '@nestjs/common';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const soap = require('strong-soap').soap;

const WSDL_URL = 'http://portalquery.just.ro/Query.asmx?WSDL';

@Injectable()
export class PortalJustProvider {
  private readonly logger = new Logger(PortalJustProvider.name);

  async searchByCase(caseNumber: string): Promise<any[]> {
    this.logger.log(`Searching for case: ${caseNumber}`);

    return new Promise((resolve, reject) => {
      soap.createClient(WSDL_URL, {}, (err: Error | null, client: any) => {
        if (err) return reject(new Error(err.message));

        const args = {
          numarDosar: caseNumber,
          obiectDosar: null,
          numeParte: null,
          institutie: null,
          dataStart: null,
          dataStop: null,
        };

        client.CautareDosare(args, (err: Error | null, result: any) => {
          if (err) return reject(new Error(err.message));

          if (result && result.CautareDosareResult) {
            const dosar = result.CautareDosareResult.Dosar;
            if (!dosar) return resolve([]);
            const dosarList = Array.isArray(dosar) ? dosar : [dosar];
            resolve(
              dosarList.map((d: any) => this.unwrapSingleElementArrays(d)),
            );
          } else {
            resolve([]);
          }
        });
      });
    });
  }

  private unwrapSingleElementArrays(obj: any): any {
    if (!obj || typeof obj !== 'object') return obj;

    for (const key of Object.keys(obj)) {
      const value = obj[key];

      if (Array.isArray(value) && value.length === 1) {
        obj[key] = value[0];
      }

      if (
        obj[key] &&
        typeof obj[key] === 'object' &&
        !Array.isArray(obj[key])
      ) {
        this.unwrapSingleElementArrays(obj[key]);
      }
    }

    return obj;
  }
}
