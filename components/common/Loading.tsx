import { useEffect } from "react";

interface LoadingProps {
  size?: number; // in rem
  color?: string;
  hasOverlay?: boolean;
}

export const Loading = ({
  size = 13.75,
  color = "#183153",
  hasOverlay,
}: LoadingProps) => {
  const dots = Array.from({ length: 12 });
  const sizeInRem = `${size}rem`;
  const dotSize = size * 0.2; // Adjusted for better proportion

  useEffect(() => {
    // Add class when component mounts
    document.body.classList.add("no-scroll");

    // Remove class when component unmounts
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, []);

  return (
    <>
      {hasOverlay && (
        <div className="fixed top-0 left-0 mlg:-top-4 mlg:-left-4 w-screen h-screen bg-black/60"></div>
      )}
      <div className="fixed top-0 left-0 mlg:-top-4 mlg:-left-4 w-screen h-screen flex justify-center items-center">
        <div
          className="relative flex items-center justify-start"
          style={{
            height: sizeInRem,
            width: sizeInRem,
            ["--uib-size" as string]: sizeInRem,
            ["--uib-color" as string]: color,
            ["--uib-speed" as string]: "0.9s",
            ["--dot-size" as string]: `${dotSize}rem`,
          }}
        >
          {dots.map((_, index) => (
            <div
              key={index}
              className="dot-spinner__dot absolute top-0 left-0 flex h-full w-full items-center justify-start"
              style={{
                transform: `rotate(${30 * index}deg)`,
                ["--dot-delay" as string]: `calc(var(--uib-speed) * -${
                  (12 - index) * 0.0833
                })`,
              }}
            >
              <div className="before:absolute before:rounded-full before:opacity-50 before:shadow-[0_0_20px_rgba(18,31,53,0.3)]" />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
