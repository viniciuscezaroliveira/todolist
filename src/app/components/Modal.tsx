type Props = {
  children: React.ReactNode;
};
export function Modal({ children }: Readonly<Props>) {
  return (
    <div className="absolute w-full top-0 left-0 right-0 ml-auto mr-auto container z-10 h-full backdrop-blur-md flex justify-center items-center">
      {children}
    </div>
  );
}
