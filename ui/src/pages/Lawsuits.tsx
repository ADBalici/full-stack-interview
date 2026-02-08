import { useState } from 'react';
import {
  Box,
  Flex,
  Heading,
  Input,
  Stack,
  Text,
  Badge,
  Spinner,
} from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { fetchLawsuit } from '@/api/lawsuits';
import { HearingsTable } from '@/components/HearingsTable';

export function Lawsuits() {
  const [inputValue, setInputValue] = useState('');
  const [caseNumber, setCaseNumber] = useState('');

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['lawsuit', caseNumber],
    queryFn: () => fetchLawsuit(caseNumber),
    enabled: caseNumber.length > 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCaseNumber(inputValue.trim());
  };

  return (
    <Box p="8" maxW="6xl" mx="auto">
      <Heading size="2xl" mb="6">
        Court Case Lookup
      </Heading>

      <form onSubmit={handleSubmit}>
        <Flex gap="3" mb="8">
          <Input
            placeholder="Enter case number (e.g. 21969/301/2025)"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            size="lg"
            flex="1"
          />
        </Flex>
      </form>

      {isLoading && (
        <Flex justify="center" py="12">
          <Spinner size="xl" />
        </Flex>
      )}

      {isError && (
        <Box p="4" bg="red.50" borderWidth="1px" borderColor="red.200">
          <Text color="red.600">
            {error instanceof Error ? error.message : 'An error occurred'}
          </Text>
        </Box>
      )}

      {data && (
        <Stack gap="8">
          <Box>
            <Heading size="lg" mb="4">
              Case Information
            </Heading>
            <Stack gap="2">
              <Flex gap="2" align="center">
                <Text fontWeight="bold" minW="120px">
                  Case Number:
                </Text>
                <Text>{data.caseNumber}</Text>
              </Flex>
              <Flex gap="2" align="center">
                <Text fontWeight="bold" minW="120px">
                  Institution:
                </Text>
                <Text>{data.institution}</Text>
              </Flex>
              <Flex gap="2" align="center">
                <Text fontWeight="bold" minW="120px">
                  Department:
                </Text>
                <Text>{data.department}</Text>
              </Flex>
              <Flex gap="2" align="center">
                <Text fontWeight="bold" minW="120px">
                  Category:
                </Text>
                <Text>{data.category}</Text>
              </Flex>
            </Stack>
          </Box>

          <Box>
            <Heading size="lg" mb="4">
              Parties
            </Heading>
            {data.parties.length === 0 ? (
              <Text color="fg.muted" fontSize="sm">
                No parties found.
              </Text>
            ) : (
              <Stack gap="1">
                {data.parties.map((party, index) => (
                  <Flex key={index} gap="2" align="center">
                    <Badge variant="subtle" size="sm">
                      {party.role}
                    </Badge>
                    <Text>{party.name}</Text>
                  </Flex>
                ))}
              </Stack>
            )}
          </Box>

          <Box>
            <Heading size="lg" mb="4">
              Hearings
            </Heading>
            <HearingsTable hearings={data.hearings} />
          </Box>
        </Stack>
      )}
    </Box>
  );
}
