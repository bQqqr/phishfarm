import { useRecoilState } from 'recoil';
import { Button, useDisclosure, VStack } from '@chakra-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Drawer, Form, Table } from 'app/components';
import { ITarget } from 'app/interfaces';
import { targetsAtom } from 'app/global';
import { useAddTarget, useRemoveTarget } from 'features/configuration';

export interface IData {
  firstName: string;
  lastName: string;
  emailAddress: string;
  maldoc: File[];
}

export const TargetsTable = () => {
  // Hooks
  const form = useForm<IData>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [targets, setTargets] = useRecoilState(targetsAtom);
  const { addTarget } = useAddTarget();
  const { removeTarget } = useRemoveTarget();

  // Definitions
  const toBase64 = async (blob: File) => {
    return new Promise((resolve, _) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(blob);
    }) as Promise<string>;
  };

  const onSubmit: SubmitHandler<IData> = async (inputs) => {
    const content = await toBase64(inputs.maldoc[0]);

    const resp = await addTarget({
      firstName: inputs.firstName,
      lastName: inputs.lastName,
      emailAddress: inputs.emailAddress,
      maldocFilename: inputs.maldoc[0].name,
      maldocContent: content,
    });

    if (resp?.id)
      setTargets((oldTargets) => {
        const target: ITarget = {
          id: resp.id,
          firstName: inputs.firstName,
          lastName: inputs.lastName,
          emailAddress: inputs.emailAddress,
          maldoc: {
            content: content,
            filename: inputs.maldoc[0].name,
          },
        };

        return oldTargets ? [...oldTargets, target] : [target];
      });
    onClose();
  };

  const onDelete = async (id: string) => {
    setTargets((oldTargets) => {
      if (oldTargets)
        return oldTargets.filter((t) => {
          return t.id !== id;
        });
      else return [];
    });

    await removeTarget({ targetId: id });
  };

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
