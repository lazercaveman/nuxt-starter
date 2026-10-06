export const fetchHtml = async (sourceUrl: string): Promise<string> =>
  await $fetch<string>(sourceUrl, {
    responseType: 'text',
    timeout: 15_000,
    headers: { 'user-agent': 'auction-grabber/1.0 (+https://github.com/lazercaveman)' },
  });
