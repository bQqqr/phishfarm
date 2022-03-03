import { Center, Spinner } from '@chakra-ui/react';
import { useRecoilState } from 'recoil';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Form } from 'app/components';
import { IChangeEmailConfigRequest } from 'app/interfaces';
import { useChangeEmailConfig } from 'features/configuration';
import { emailConfigAtom } from 'app/global/app';

export const EmailConfigurationForm = () => {
  // Hooks
  const [config] = useRecoilState(emailConfigAtom);
  const form = useForm<IChangeEmailConfigRequest>();
  const { changeEmailConfig } = useChangeEmailConfig();

  // Functions
  const onSubmit: SubmitHandler<IChangeEmailConfigRequest> = async (inputs) => {
    await changeEmailConfig({
      smtpHost: inputs.smtpHost,
      smtpPort: inputs.smtpPort,
      smtpUsername: inputs.smtpUsername,
      smtpPassword: inputs.smtpPassword,
      fromEmail: inputs.fromEmail,
      fromName: inputs.fromName,
      subject: inputs.subject,
      enabledSsl: inputs.enabledSsl,
    });
  };

  // Returns
  if (config)
    return (
      <Form onSubmit={form.handleSubmit(onSubmit)}>
        <Form.Field>
          <Form.Field.Label>SMTP Host</Form.Field.Label>
          <Form.Field.Input
            defaultValue={config.smtpHost}
            {...form.register('smtpHost')}
          />
          <Form.Field.Desc>Enter the SMTP's dns or ipv4.</Form.Field.Desc>
        </Form.Field>
        <Form.Field>
          <Form.Field.Label>SMTP Port</Form.Field.Label>
          <Form.Field.Number defaultValue={config.smtpPort}>
            <Form.Field.Number.Input {...form.register('smtpPort')} />
          </Form.Field.Number>
          <Form.Field.Desc>Enter SMTP port number.</Form.Field.Desc>
        </Form.Field>
        <Form.Field>
          <Form.Field.Label>SMTP Username</Form.Field.Label>
          <Form.Field.Input
            defaultValue={config.smtpUsername}
            {...form.register('smtpUsername')}
          />
          <Form.Field.Desc>Enter the SMTP username credential.</Form.Field.Desc>
        </Form.Field>
        <Form.Field>
          <Form.Field.Label>SMTP Password</Form.Field.Label>
          <Form.Field.Input
            defaultValue={config.smtpPassword}
            {...form.register('smtpPassword')}
          />
          <Form.Field.Desc>Enter the SMTP password credential.</Form.Field.Desc>
        </Form.Field>
        <Form.Field>
          <Form.Field.Label>From Email</Form.Field.Label>
          <Form.Field.Input
            defaultValue={config.fromEmail}
            {...form.register('fromEmail')}
          />
          <Form.Field.Desc>Enter the From's email address.</Form.Field.Desc>
        </Form.Field>
        <Form.Field>
          <Form.Field.Label>From Name</Form.Field.Label>
          <Form.Field.Input
            defaultValue={config.fromName}
            {...form.register('fromName')}
          />
          <Form.Field.Desc>Enter the From's name.</Form.Field.Desc>
        </Form.Field>
        <Form.Field>
          <Form.Field.Label>Subject</Form.Field.Label>
          <Form.Field.Input
            defaultValue={config.subject}
            {...form.register('subject')}
          />
          <Form.Field.Desc>
            Enter the subject of the email message.
          </Form.Field.Desc>
        </Form.Field>
        <Form.Field textAlign="left">
          <Form.Field.Checkbox
            defaultValue={config.enabledSsl.toString()}
            {...form.register('enabledSsl')}
          >
            Is SSL enabled?
          </Form.Field.Checkbox>
        </Form.Field>
        <Form.Button colorScheme="green">Save Email Config</Form.Button>
      </Form>
    );
  else
    return (
      <Center>
        <Spinner />
      </Center>
    );
};
