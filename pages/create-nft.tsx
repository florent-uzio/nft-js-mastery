import { useTheme } from 'next-themes';
import Image from 'next/image';
import { useCallback, useContext, useMemo, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import images from '../assets';
import { Button, Input } from '../components/shared';
import { NFTContext } from '../context';

type FormInput = {
  price: string;
  name: string;
  description: string;
};

const CreateNFT = () => {
  const { theme } = useTheme();
  const [fileUrl, setFileUrl] = useState<string>();
  const [, setFormInput] = useState<FormInput>({
    price: '',
    name: '',
    description: '',
  });

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const url = await uploadToIPFS(acceptedFiles[0]);

    setFileUrl(url);
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.png', '.gif', '.jpeg', '.jpg'] },
    maxSize: 5000000,
  });
  const { uploadToIPFS } = useContext(NFTContext);

  const fileStyle = useMemo(() => {
    return `dark:bg-nft-black-1 bg-white border dark:border-white border-nft-gray-2 flex flex-col items-center p-5 rounded-sm border-dashed
    ${isDragActive ? ' border-file-active' : ''}
    ${isDragAccept ? ' border-file-accept' : ''}
    ${isDragReject ? ' border-file-reject' : ''}`;
  }, [isDragAccept, isDragActive, isDragReject]);

  return (
    <div className="flex justify-center sm:px-4 p-12">
      <div className="w-3/5 md:w-full ">
        <h1 className="font-poppins dark:text-white text-nft-black-1 text-2xl minlg:text-4xl font-semibold ml-4 xs:ml-0">
          Create New NFT
        </h1>
        <div className="mt-16">
          <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-xl">
            Upload File
          </p>
          <div className="mt-4">
            <div {...getRootProps()} className={fileStyle}>
              <input {...getInputProps()} />
              <div className="flexCenter flex-col text-center">
                <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-xl">
                  JPG, PNG, GIF, JPEG. Max 5mb.
                </p>

                <div className="my-12 min-w-full flex justify-center">
                  <Image
                    src={images.upload}
                    width={100}
                    height={100}
                    objectFit="contain"
                    alt="File Upload"
                    className={theme === 'light' ? 'filter invert' : ''}
                  />
                </div>

                <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-sm">
                  Drag and Drop File
                </p>
                <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-sm mt-2">
                  or Browse media on your device
                </p>
              </div>
            </div>
            {fileUrl && (
              <aside>
                <div>
                  <img src={fileUrl} alt="asset_file" />
                </div>
              </aside>
            )}
          </div>
        </div>

        <Input
          inputType="input"
          title="Name"
          placeholder="NFT name"
          onChange={(event) => {
            setFormInput((current) => {
              return {
                ...current,
                // @ts-ignore
                name: event.target.value,
              };
            });
          }}
        />
        <Input
          inputType="textarea"
          title="Description"
          placeholder="NFT description"
          onChange={(event) => {
            setFormInput((current) => {
              return {
                ...current,
                // @ts-ignore
                description: event.target.value,
              };
            });
          }}
        />
        <Input
          inputType="number"
          title="Price"
          placeholder="NFT price"
          onChange={(event) => {
            setFormInput((current) => {
              return {
                ...current,
                // @ts-ignore
                price: event.target.value,
              };
            });
          }}
        />

        <div className="mt-7 w-full flex justify-end">
          <Button className="rounded-xl" onClick={() => {}}>
            Create NFT
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateNFT;
