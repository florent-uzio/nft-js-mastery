import type { NextPage } from 'next';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import images from '../assets';
import { Banner, CreatorCard, NFTCard } from '../components';
import { makeId } from '../utils';

type Direction = 'left' | 'right';
type EthAddresses = {
  creatorName: string;
  owner: string;
  seller: string;
};

const Home: NextPage = () => {
  const [hideButtons, setHideButtons] = useState(false);
  const parentRef = useRef(null);
  const scrollRef = useRef(null);
  const { theme } = useTheme();
  const [ethAddresses, setEthAddresses] = useState<EthAddresses>({
    creatorName: '',
    owner: '',
    seller: '',
  });

  useEffect(() => {
    setEthAddresses({
      creatorName: `0x${makeId(3)}...${makeId(4)}`,
      owner: `0x${makeId(3)}...${makeId(4)}`,
      seller: `0x${makeId(3)}...${makeId(4)}`,
    });
  }, []);

  const handleScroll = (direction: Direction) => {
    const { current } = scrollRef;

    if (current === null) return;

    const scrollAmount = window.innerWidth > 1800 ? 270 : 210;

    if (direction === 'left') {
      // @ts-ignore
      current.scrollLeft -= scrollAmount;
    } else {
      // @ts-ignore
      current.scrollLeft += scrollAmount;
    }
  };

  const isScrollable = () => {
    const { current } = scrollRef;
    const { current: parent } = parentRef;

    // @ts-ignore
    if (current?.scrollWidth >= parent?.offsetWidth) {
      setHideButtons(false);
    } else {
      setHideButtons(true);
    }
  };

  useEffect(() => {
    isScrollable();
    window.addEventListener('resize', isScrollable);

    return () => {
      window.removeEventListener('resize', isScrollable);
    };
  }, []);

  return (
    <div className="flex justify-center sm:px-4 p-12">
      <div className="w-full minmd:w-4/5">
        <Banner
          name="Discover, collect and sell extraordinary NFTs"
          className="justify-start mb-6 h-72 sm:h-60 p-12 xs:p-4 xs:h-44 rounded-3xl"
          textStyles="md:text-4xl sm:text-2xl xs:text-xl text-left"
        />
        <div>
          <h1 className="font-poppins dark:text-white text-nft-black-1 text-2xl minlg:text-4xl font-semibold ml-4 xs:ml-0">
            Best Creators
          </h1>

          <div className="relative flex-1 max-w-full flex mt-3" ref={parentRef}>
            <div
              className="flex flex-row w-max overflow-x-scroll no-scrollbar select-none"
              ref={scrollRef}
            >
              {[6, 7, 8, 9, 10].map((index) => {
                return (
                  <CreatorCard
                    key={`creator-${index}`}
                    rank={index}
                    // @ts-ignore
                    creatorImage={images[`creator${index}`]}
                    creatorName={ethAddresses?.creatorName}
                    creatorEths={10 - index * 0.5}
                  />
                );
              })}

              {!hideButtons && (
                <>
                  <div
                    onClick={() => handleScroll('left')}
                    className="absolute w-8 h-8 minlg:w-12 minlg:h-12 top-45 cursor-pointer left-0"
                  >
                    <Image
                      src={images.left}
                      layout="fill"
                      objectFit="contain"
                      alt="left"
                      className={theme === 'light' ? 'filter invert' : ''}
                    />
                  </div>
                  <div
                    onClick={() => {
                      handleScroll('right');
                    }}
                    className="absolute w-8 h-8 minlg:w-12 minlg:h-12 top-45 cursor-pointer right-0"
                  >
                    <Image
                      src={images.right}
                      layout="fill"
                      objectFit="contain"
                      alt="left"
                      className={theme === 'light' ? 'filter invert' : ''}
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="mt-10">
          <div className="flex-1 flexBetween mx-4 xs:mx-0 minlg:mx-8 sm:flex-col sm:items-start">
            <h1 className="font-poppins dark:text-white text-nft-black-1 text-2xl minlg:text-4xl font-semibold sm:mb-4">
              Hot Bids
            </h1>
            <div>SearchBar</div>
          </div>
          <div className="mt-3 w-full flex flex-wrap justify-start md:justify-center">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((nft, index) => {
              return (
                <NFTCard
                  key={`nft-${index}`}
                  nft={{
                    description: 'Cool NFT on sale',
                    image: '',
                    name: `Nifty NFT ${index}`,
                    nft,
                    owner: ethAddresses.owner,
                    price: (10 - nft * 0.534).toFixed(2),
                    seller: ethAddresses.seller,
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
