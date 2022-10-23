import classNames from 'classnames';

type ButtonType = React.HTMLAttributes<HTMLButtonElement>;

export const Button: React.FC<ButtonType> = ({
  children,
  className,
  ...rest
}) => {
  return (
    <button
      type="button"
      {...rest}
      className={classNames(
        'nft-gradient text-sm minlg:text-lg py-2 px-6 minlg:px-8 font-poppins font-semibold text-white',
        className
      )}
    >
      {children}
    </button>
  );
};
