import React from "react";

const App = () => {
  const contRef = React.useRef<HTMLDivElement | null>(null);
  const btnRef = React.useRef<HTMLButtonElement | null>(null);

  const [windowWidth, setWindowWidth] = React.useState<number>(window.innerWidth);
  const [windowHeight, setWindowHeight] = React.useState<number>(window.innerHeight);

  React.useEffect(() => {
    const contEl = contRef?.current;
    const btnEl = btnRef?.current;

    const resizeHandler = () => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener("resize", resizeHandler);

    const mouseMoveHandler = (e) => {
      if (!btnEl) return;

      const clientX = e.clientX;
      const clientY = e.clientY;

      const btnX = btnEl?.getBoundingClientRect().x;
      const btnY = btnEl?.getBoundingClientRect().y;

      const btnWidth = btnEl?.getBoundingClientRect().width;
      const btnHeight = btnEl?.getBoundingClientRect().height;

      // console.log("clietX, clientY", clientX, clientY);
      // console.log("windowWidth, windowHeight", windowWidth, windowHeight);

      // console.log("btnX, btnY", btnX, btnY);
      // console.log("btnWidth, btnHeight", btnWidth, btnHeight);

      let onTheLeftSideOfTheWindow = false;
      let onTheTopSideOfTheWindow = false;

      if (btnY > windowHeight / 2) {
        onTheTopSideOfTheWindow = true;
      } else {
        onTheTopSideOfTheWindow = false;
      }

      if (btnX < windowWidth / 2) {
        onTheLeftSideOfTheWindow = true;
      } else {
        onTheLeftSideOfTheWindow = false;
      }

      const closeNum = 50;
      const movingNum = 10;
      const multiplier = 1.5;

      const cursorCloseToLeftSide = Math.abs(btnX - clientX) < closeNum;
      const cursorCloseToRightSide = Math.abs(clientX - btnX - btnWidth / 2) < closeNum;
      const cursorCloseToTopSide = Math.abs(btnY - clientY) < closeNum;
      const cursorCloseToBottomSide = Math.abs(clientY - btnY - btnHeight / 2) < closeNum;

      const btnXCloseToRightSide = Math.round(btnX) >= windowWidth - Math.round(btnWidth);
      const btnXCloseToLeftSide = Math.round(btnX) <= 0;
      const btnYCloseToBottomSide = Math.round(btnY) >= windowHeight - Math.round(btnHeight);
      const btnYCloseToTopSide = Math.round(btnY) <= 0;

      if (cursorCloseToLeftSide && cursorCloseToTopSide) {
        console.log("left top");

        if (btnXCloseToRightSide) {
          console.log("btnXCloseToRightSide");
          if (onTheTopSideOfTheWindow) {
            btnEl.style.top = `${btnY - movingNum * multiplier}px`;
          } else {
            btnEl.style.top = `${btnY + movingNum * multiplier}px`;
          }
          btnEl.style.left = `${btnX - movingNum * multiplier}px`;

          return;
        }

        if (btnYCloseToBottomSide) {
          console.log("btnYCloseToBottomSide");
          if (onTheLeftSideOfTheWindow) {
            btnEl.style.left = `${btnX + movingNum * multiplier}px`;
          } else {
            btnEl.style.left = `${btnX - movingNum * multiplier}px`;
          }

          btnEl.style.top = `${btnY - movingNum * multiplier}px`;

          return;
        }

        btnEl.style.left = `${btnX + movingNum}px`;
        btnEl.style.top = `${btnY + movingNum}px`;
      } else if (cursorCloseToLeftSide && cursorCloseToBottomSide) {
        console.log("left bottom");

        if (btnXCloseToRightSide) {
          console.log("btnXCloseToRightSide");
          if (onTheTopSideOfTheWindow) {
            btnEl.style.top = `${btnY - movingNum * multiplier}px`;
          } else {
            btnEl.style.top = `${btnY + movingNum * multiplier}px`;
          }
          btnEl.style.left = `${btnX - movingNum * multiplier}px`;

          return;
        }

        if (btnYCloseToTopSide) {
          console.log("btnYCloseToTopSide");
          if (onTheLeftSideOfTheWindow) {
            btnEl.style.left = `${btnX + movingNum * multiplier}px`;
          } else {
            btnEl.style.left = `${btnX - movingNum * multiplier}px`;
          }
          btnEl.style.top = `${btnY + movingNum * multiplier}px`;

          return;
        }

        btnEl.style.left = `${btnX + movingNum}px`;
        btnEl.style.top = `${btnY - movingNum}px`;
      } else if (cursorCloseToRightSide && cursorCloseToTopSide) {
        console.log("right top");

        if (btnXCloseToLeftSide) {
          console.log("btnXCloseToLeftSide");
          if (onTheTopSideOfTheWindow) {
            btnEl.style.top = `${btnY - movingNum * multiplier}px`;
          } else {
            btnEl.style.top = `${btnY + movingNum * multiplier}px`;
          }
          btnEl.style.left = `${btnX + movingNum * multiplier}px`;

          return;
        }

        if (btnYCloseToBottomSide) {
          console.log("btnYCloseToBottomSide");
          if (onTheLeftSideOfTheWindow) {
            btnEl.style.left = `${btnX + movingNum * multiplier}px`;
          } else {
            btnEl.style.left = `${btnX - movingNum * multiplier}px`;
          }

          btnEl.style.top = `${btnY - movingNum * multiplier}px`;

          return;
        }

        btnEl.style.left = `${btnX - movingNum}px`;
        btnEl.style.top = `${btnY + movingNum}px`;
      } else if (cursorCloseToRightSide && cursorCloseToBottomSide) {
        console.log("right bottom");

        if (btnXCloseToLeftSide) {
          console.log("btnXCloseToLeftSide");
          if (onTheTopSideOfTheWindow) {
            btnEl.style.top = `${btnY - movingNum * multiplier}px`;
          } else {
            btnEl.style.top = `${btnY + movingNum * multiplier}px`;
          }
          btnEl.style.left = `${btnX + movingNum * multiplier}px`;

          return;
        }

        if (btnYCloseToTopSide) {
          console.log("btnYCloseToTopSide");
          if (onTheLeftSideOfTheWindow) {
            btnEl.style.left = `${btnX + movingNum * multiplier}px`;
          } else {
            btnEl.style.left = `${btnX - movingNum * multiplier}px`;
          }
          btnEl.style.top = `${btnY + movingNum * multiplier}px`;

          return;
        }

        btnEl.style.left = `${btnY + movingNum}px`;
        btnEl.style.top = `${btnY - movingNum}px`;
      }
    };

    contEl?.addEventListener("mousemove", mouseMoveHandler);

    return () => {
      contEl?.removeEventListener("mousemove", mouseMoveHandler);

      window.removeEventListener("resize", resizeHandler);
    };
  }, [windowHeight, windowWidth]);

  return (
    <>
      <div
        ref={contRef}
        style={{
          background: "url(/imgs/monobank-styled.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        className=" flex grow-1 flex-col items-center justify-center h-full relative  w-full bg-no-repeat bg-cover bg-center font-extrabold"
      >
        <div className="bg-white border-4 border-black rounded-lg p-5">
          <h1 className="text-6xl">За Лебіговича!🇺🇦</h1>
        </div>

        <button
          style={{
            background: "url(/imgs/ukraine-flag.png)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
          className="absolute rounded-md p-5 ease-linear top-[60%] left-[40%]"
          onClick={() => {
            alert("Слава Україні!🇺🇦");
          }}
        >
          <span className="text-md  ">Так</span>
        </button>

        <button
          ref={btnRef}
          className="absolute bg-red-600 rounded-md p-5 ease-linear  z-10 top-[60%] left-[55%]"
          onClick={() => {
            alert("ТЦК тебе не забуде!🤡");
          }}
        >
          Нє
        </button>
      </div>
    </>
  );
};

export default App;
