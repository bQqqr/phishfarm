import { useContext, useEffect, useState } from 'react';
import { Button, Center, HStack, Spinner } from '@chakra-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Form } from 'app/components';
import { AppCtx } from 'app/context';
import { IEmailConfig, useReadEmailConfig } from 'features/config';

interface IData {
  host: string;
  port: number;
  username: string;
  password: string;
  fromEmail: string;
  fromName: string;
  subject: string;
  ssl: boolean;
}

export const EmailConfigurationForm = () => {
  // State
  const [config, setConfig] = useState<IEmailConfig | null>(null);

  // Hooks
  const form = useForm<IData>();
  const app = useContext(AppCtx);
  const { fetchConfig } = useReadEmailConfig();

  // Boostrap
  useEffect(() => {
    async function boostrapConfig() {
      const config = await fetchConfig();
      setConfig(config);
    }

    boostrapConfig();
  }, [fetchConfig]);

  // Definitions
  const onSubmit: SubmitHandler<IData> = async (inputs) => {
    try {
      //const response = await fetch(`http://${app.host}/api/operator`);
    } catch (exception) {}
  };

  if (config)
    // Returns
    return (
      <Form onSubmit={form.handleSubmit(onSubmit)}>
        <Form.Field>
          <Form.Field.Label>SMTP Host</Form.Field.Label>
          <Form.Field.Input defaultValue={config.smtpHost} {...form.register('host')} />
          <Form.Field.Desc>Enter the DNS or the IPv4 address of the SMTP server.</Form.Field.Desc>
        </Form.Field>
        <Form.Field>
          <Form.Field.Label>SMTP Port</Form.Field.Label>
          <Form.Field.Number defaultValue={config.smtpPort}>
            <Form.Field.Number.Input {...form.register('port')} />
          </Form.Field.Number>
          <Form.Field.Desc>Enter SMTP port number.</Form.Field.Desc>
        </Form.Field>
        <Form.Field>
          <Form.Field.Label>Username</Form.Field.Label>
          <Form.Field.Input defaultValue={config.smtpUsername} {...form.register('username')} />
          <Form.Field.Desc>Enter the SMTP username credential.</Form.Field.Desc>
        </Form.Field>
        <Form.Field>
          <Form.Field.Label>Password</Form.Field.Label>
          <Form.Field.Input defaultValue={config.smtpPassword} {...form.register('password')} />
          <Form.Field.Desc>Enter the SMTP password credential.</Form.Field.Desc>
        </Form.Field>
        <Form.Field>
          <Form.Field.Label>From Email</Form.Field.Label>
          <Form.Field.Input defaultValue={config.fromEmail} {...form.register('fromEmail')} />
          <Form.Field.Desc>Enter the email that is displayed as sender email.</Form.Field.Desc>
        </Form.Field>
        <Form.Field>
          <Form.Field.Label>From Name</Form.Field.Label>
          <Form.Field.Input defaultValue={config.fromName} {...form.register('fromName')} />
          <Form.Field.Desc>Enter the name that is displayed as sender name.</Form.Field.Desc>
        </Form.Field>
        <Form.Field>
          <Form.Field.Label>Subject</Form.Field.Label>
          <Form.Field.Input defaultValue={config.subject} {...form.register('subject')} />
          <Form.Field.Desc>Enter the subject of the email message.</Form.Field.Desc>
        </Form.Field>
        <Form.Field>
          <Form.Field.Checkbox
            defaultValue={config.enabledSsl.toString()}
            {...form.register('ssl')}
          >
            Is SSL enabled?
          </Form.Field.Checkbox>
        </Form.Field>
        <HStack>
          <Form.Button>✅ Save</Form.Button>
          <Button>🧪 Test</Button>
        </HStack>
      </Form>
    );
  else
    return (
      <Center>
        <Spinner />
      </Center>
    );
};
