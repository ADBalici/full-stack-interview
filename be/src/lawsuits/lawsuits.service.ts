/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-argument */
import { Injectable, NotFoundException } from '@nestjs/common';
import { PortalJustProvider } from './portal-just.provider';
import type {
  Hearing,
  LawsuitResponse,
  Party,
} from './interfaces/lawsuit.interface';

@Injectable()
export class LawsuitsService {
  constructor(private readonly portalJust: PortalJustProvider) {}

  async findByCase(caseNumber: string): Promise<LawsuitResponse> {
    const dosarList = await this.portalJust.searchByCase(caseNumber);

    if (dosarList.length === 0) {
      throw new NotFoundException(
        `No results found for case number: ${caseNumber}`,
      );
    }

    const dosar = dosarList[0];

    const hearings = this.extractHearings(dosarList);
    const parties = this.extractParties(dosar);

    return {
      caseNumber: dosar['numar'] || '',
      department: dosar['departament'] || '',
      institution: dosar['institutie'] || '',
      category: dosar['categorieCaz'] || '',
      parties,
      hearings,
    };
  }

  private extractHearings(dosarList: any[]): Hearing[] {
    const allHearings: Hearing[] = [];

    for (const dosar of dosarList) {
      const sedinte = dosar?.sedinte?.DosarSedinta;
      if (!sedinte) continue;

      const hearingItems = sedinte.map((s: any) => ({
        date: this.formatDate(s['data']),
        time: s['ora'] || '',
        panel: s['complet'] || '',
        institution: dosar['institutie'] || '',
        resolution: s['solutie'] || '',
      }));

      allHearings.push(...hearingItems);
    }

    return allHearings;
  }

  private extractParties(dosar: any): Party[] {
    const parti = dosar?.parti?.DosarParte;
    if (!parti) return [];

    const partiArray = Array.isArray(parti) ? parti : [parti];

    return partiArray.map((p: any) => ({
      name: p['nume'] || '',
      role: p['calitateParte'] || '',
    }));
  }

  private formatDate(value: unknown): string {
    if (!value) return '';
    if (value instanceof Date) {
      return value.toISOString().split('T')[0];
    }
    return String(value as string);
  }
}
