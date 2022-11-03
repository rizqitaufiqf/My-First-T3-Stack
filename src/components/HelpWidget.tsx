import { useState } from "react";
import { RiCustomerService2Fill } from "react-icons/ri";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { IoMdSend } from "react-icons/io";
import { trpc } from "../utils/trpc";

type TMessage = {
  message: string;
  id: string;
  senderId: string;
};

export const HelpWidget = () => {
  const createHelpRequestMutation =
    trpc.helpRequest.createHelpRequest.useMutation();
  const [isChatDiplayed, setIsChatDisplayed] = useState(false);
  const [senderId, setSenderId] = useState("0");
  const [messages, setMessages] = useState<TMessage[]>([
    {
      message:
        "Hello asdasdhqwedfdsdh qwrwehldksjdflhf dsfasdjhlfasw dfhwefnvmxczm,viwdah",
      id: "1234qweq",
      senderId: "1",
    },
    { message: "Hi!!", id: "asdasdas", senderId: "0" },
    { message: "test!!", id: "sqwe", senderId: "1" },
  ]);

  const handleOpenSupportWidget = () => {
    setIsChatDisplayed(true);
    createHelpRequestMutation.mutate();
  };
  return isChatDiplayed ? (
    <div className="fixed bottom-7 right-10 flex h-[30rem] w-72 flex-col justify-between rounded-md bg-gray-100">
      <AiOutlineCloseCircle
        className="absolute right-2 top-2 h-5 w-5 cursor-pointer text-blue-500 hover:text-blue-600"
        onClick={() => setIsChatDisplayed(!isChatDiplayed)}
      />
      <ul className="pt-8 pr-7 pl-3">
        {messages.map(({ message, id, senderId: senderIds }) => (
          <li
            key={id}
            className={`mb-2 flex px-2 py-2 ${
              senderIds === senderId
                ? "mr-2 justify-end rounded-bl-xl rounded-tl-xl rounded-tr-xl bg-gray-300 py-3 px-4"
                : "ml-2 justify-start rounded-tl-xl rounded-br-xl rounded-tr-xl  bg-blue-300 py-3 px-4"
            }`}
          >
            {message}
          </li>
        ))}
      </ul>

      <div className="flex flex-row px-2 py-3">
        <input className="h-7 basis-5/6 rounded-md border border-gray-300" />
        <IoMdSend
          className="h-7 w-7 basis-1/6 cursor-pointer pl-3 text-blue-400 hover:text-blue-500"
          onClick={() => console.log("click")}
        />
      </div>
    </div>
  ) : (
    <button
      onClick={handleOpenSupportWidget}
      className="fixed bottom-10 right-10 flex cursor-pointer items-center rounded-md bg-blue-400 p-3 font-semibold text-white hover:bg-blue-500"
    >
      <div>Our Support</div>
      <div className="ml-2">
        <RiCustomerService2Fill />
      </div>
    </button>
  );
};
