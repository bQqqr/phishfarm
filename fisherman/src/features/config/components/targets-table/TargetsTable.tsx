import { useEffect, useState } from 'react';
import { Button, useDisclosure, VStack } from '@chakra-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Drawer, Form, Table } from 'app/components';
import { ITarget, useAddTarget, useReadTargets } from 'features/config';
import { useRemoveTarget } from 'features/config/hooks/useRemoveTarget';

export interface IData {
  firstName: string;
  lastName: string;
  emailAddress: string;
  maldoc: File[];
}

export const TargetsTable = () => {
  // Hooks
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [targets, setTargets] = useState<ITarget[]>([]);
  const { fetchTargets } = useReadTargets();
  const form = useForm<IData>();
  const { addTarget } = useAddTarget();
  const { removeTarget } = useRemoveTarget();

  // Definitions
  async function blobToBase64Async(blob: File) {
    return new Promise((resolve, _) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  }
  const onSubmit: SubmitHandler<IData> = async (inputs) => {
    const content = await blobToBase64Async(inputs.maldoc[0]);
    const resp = await addTarget({
      firstName: inputs.firstName,
      lastName: inputs.lastName,
      emailAddress: inputs.emailAddress,
      maldocFilename: inputs.maldoc[0].name,
      maldocContent: content,
    });

    setTargets([
      ...targets,
      {
        id: resp?.id,
        firstName: inputs.firstName,
        lastName: inputs.lastName,
        emailAddress: inputs.emailAddress,
        maldoc: {
          filename: inputs.maldoc[0].name,
          content: content,
        },
      },
    ]);

    onClose();
  };
  const onDelete = async (id: string) => {
    setTargets((prevState) =>
      targets.filter((t) => {
        return t.id !== id;
      }),
    );
    await removeTarget(id);
  };

  // Boostrap
  useEffect(() => {
    async function setupTargets() {
      const targets = await fetchTargets();
      setTargets(targets);
    }

    setupTargets();
  }, [fetchTargets]);

  return (
    <VStack align="start" spacing={5}>
      <Button size="sm" onClick={onOpen} colorScheme="green">
        Add Target
      </Button>
      <Drawer isOpen={isOpen} onClose={onClose}>
        <Drawer.Header>Add a Target</Drawer.Header>
        <Drawer.Body>
          <Form onSubmit={form.handleSubmit(onSubmit)}>
            <Form.Field>
              <Form.Field.Label>First Name</Form.Field.Label>
              <Form.Field.Input {...form.register('firstName')} type="text" />
              <Form.Field.Desc>Enter the target's first name.</Form.Field.Desc>
            </Form.Field>
            <Form.Field>
              <Form.Field.Label>Last Name</Form.Field.Label>
              <Form.Field.Input {...form.register('lastName')} type="text" />
              <Form.Field.Desc>Enter the target's last name.</Form.Field.Desc>
            </Form.Field>
            <Form.Field>
              <Form.Field.Label>Email</Form.Field.Label>
              <Form.Field.Input
                {...form.register('emailAddress')}
                type="email"
              />
              <Form.Field.Desc>
                Enter the target's email address.
              </Form.Field.Desc>
            </Form.Field>
            <Form.Field>
              <Form.Field.Label>Maldoc</Form.Field.Label>
              <Form.Field.Input {...form.register('maldoc')} type="file" />
              <Form.Field.Desc>
                Enter the target's served maldoc.
              </Form.Field.Desc>
            </Form.Field>
            <Form.Button>Add Target</Form.Button>
          </Form>
        </Drawer.Body>
      </Drawer>
      <Table>
        <Table.Head>
          <Table.Row>
            <Table.Column>GUID</Table.Column>
            <Table.Column>First Name</Table.Column>
            <Table.Column>Last Name</Table.Column>
            <Table.Column>Email Address</Table.Column>
            <Table.Column>Actions</Table.Column>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {targets?.map((v, i) => (
            <Table.Row key={i}>
              <Table.Cell>{v.id}</Table.Cell>
              <Table.Cell>{v.firstName}</Table.Cell>
              <Table.Cell>{v.lastName}</Table.Cell>
              <Table.Cell>{v.emailAddress}</Table.Cell>
              <Table.Cell>
                <Button onClick={() => onDelete(v.id)} colorScheme="red">
                  Delete
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </VStack>
  );
};
