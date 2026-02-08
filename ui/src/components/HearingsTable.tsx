import { Box, Table, Text } from '@chakra-ui/react';
import type { Hearing } from '@/api/lawsuits';

interface HearingsTableProps {
  hearings: Hearing[];
}

export function HearingsTable({ hearings }: HearingsTableProps) {
  if (hearings.length === 0) {
    return (
      <Text color="fg.muted" fontSize="sm">
        No hearings found.
      </Text>
    );
  }

  return (
    <Box overflowX="auto">
      <Table.Root size="sm" variant="outline">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>Date</Table.ColumnHeader>
            <Table.ColumnHeader>Time</Table.ColumnHeader>
            <Table.ColumnHeader>Panel</Table.ColumnHeader>
            <Table.ColumnHeader>Institution</Table.ColumnHeader>
            <Table.ColumnHeader>Resolution</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {hearings.map((hearing, index) => (
            <Table.Row key={index}>
              <Table.Cell>{hearing.date}</Table.Cell>
              <Table.Cell>{hearing.time}</Table.Cell>
              <Table.Cell>{hearing.panel}</Table.Cell>
              <Table.Cell>{hearing.institution}</Table.Cell>
              <Table.Cell>{hearing.resolution || '-'}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Box>
  );
}
