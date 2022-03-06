import { Box, Divider, Heading, Spinner } from '@chakra-ui/react';
import { useRecoilValue } from 'recoil';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import { Form } from 'app/components';
import { campaignSettingsAtom } from 'app/global';
import { LaunchCampaignRequest, useLaunchCampaign } from 'features/campaign';

export const LaunchCampaignForm = () => {
  // Hooks
  const campaign = useRecoilValue(campaignSettingsAtom);
  const form = useForm<LaunchCampaignRequest>();
  const command = useLaunchCampaign();

  // Functions
  const onSubmit: SubmitHandler<LaunchCampaignRequest> = async (inputs) => {
    await command(inputs);
  };
  const filterPassedTime = (time: Date) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);

    return currentDate.getTime() < selectedDate.getTime();
  };

  // Returns
  if (campaign)
    return (
      <Box>
        <Heading size="md" mt={2}>
          Finizalize and Launch
        </Heading>
        <Divider my={5} />
        <Form onSubmit={form.handleSubmit(onSubmit)}>
          <Form.Field w="100%">
            <Form.Field.Label>Launch Date</Form.Field.Label>
          </Form.Field>
          <Controller
            defaultValue={campaign!.launchDate}
            name="launchDate"
            control={form.control}
            render={({ field: { onChange, value } }: any) => (
              <DatePicker
                className="_datepicker"
                selected={new Date(value)}
                onChange={onChange}
                minDate={new Date()}
                filterTime={filterPassedTime}
                showTimeSelect
                timeFormat="HH:mm"
                dateFormat="MMMM d, yyyy h:mm aa"
              />
            )}
          />
          <Form.Field>
            <Form.Field.Label>Time Interval In Minutes</Form.Field.Label>
            <Form.Field.Number defaultValue={campaign?.timeInterval}>
              <Form.Field.Number.Input {...form.register('timeInterval')} />
            </Form.Field.Number>
          </Form.Field>
          <Form.Button size="sm" variant="outline" colorScheme="blue">
            🚀 Launch Campaign
          </Form.Button>
        </Form>
      </Box>
    );
  else return <Spinner />;
};
