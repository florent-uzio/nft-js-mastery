import { create as ipfsHttpClient } from 'ipfs-http-client';

export const useIpfsClient = () => {
  const projectId = process.env.NEXT_PUBLIC_INFURA_PROJECT_ID;
  const projectSecret = process.env.NEXT_PUBLIC_INFURA_API_KEY_SECRET;
  const auth =
    'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');

  const client = ipfsHttpClient({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
    headers: {
      authorization: auth,
    },
  });

  return {
    client,
  };
};
