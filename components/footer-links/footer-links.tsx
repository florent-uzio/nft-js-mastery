type FooterLinksProps = {
  heading: string;
  items: string[];
};

export const FooterLinks = ({ heading, items }: FooterLinksProps) => {
  return (
    <div className="flex-1 justify-start items-start">
      <h3 className="font-poppins dark:text-white text-nft-black-1 font-semibold text-xl mb-10">
        {heading}
      </h3>
      {items.map((item, index) => {
        return (
          <p
            key={index}
            className="font-poppins dark:text-white text-nft-black-1 font-normal text-base cursor-pointer dark:hover:text-nft-gray-1 hover:text-nft-black-3 my-1"
          >
            {item}
          </p>
        );
      })}
    </div>
  );
};
