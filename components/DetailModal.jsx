import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Input from "./Input";
import { toast } from "react-toastify";
import { useGlobalHook } from "@/states/Context";
import {
  ExclamationTriangleIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";

export default function DetailModal() {
  const {
    edit,
    loadCards,
    setEdit,
    openDetailModal,
    setOpenDetailModal,
    cardDetails,
    setCards,
  } = useGlobalHook();
  const cancelButtonRef = useRef(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [fields, setFields] = useState({
    id: cardDetails?.id,
    download_url: cardDetails?.url,
    author: cardDetails?.author,
  });
  const updateCard = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/cards", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          id: cardDetails?.id,
        },
        body: JSON.stringify(fields),
      });
      const data = await response.json();
      if (response.ok) {
        toast.success(data.message);
        setOpenDetailModal(false);
        setEdit(false);
        loadCards()
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const handleEdit = () => {
    setFields({
      id: cardDetails?.id,
      download_url: cardDetails?.url,
      author: cardDetails?.author,
    });
    setEdit(true);
  };
  const handleChange = (e) => {
    setFields({ ...fields, [e.target.name]: e.target.value });
  };
  const handleDelete = async (e) => {
    setOpenDetailModal(false);
    setShowConfirmDialog(true);
  };
  const deleteCard = async () => {
    setShowConfirmDialog(false);
    try {
      const response = await fetch("/api/cards", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          id: cardDetails?.id,
        },
      });
      const data = await response.json();
      if (response.ok) {
        toast.success(data.message);
        setOpenDetailModal(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
    loadCards();
  };

  return !showConfirmDialog ? (
    <Transition.Root show={openDetailModal} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        initialFocus={cancelButtonRef}
        onClose={setOpenDetailModal}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>
        <div className="fixed inset-0 z-50 w-screen overflow-y-auto">
          <div className="flex min-h-full justify-center p-4 text-center items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              {!edit ? (
                <Dialog.Panel
                  className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 w-full
               sm:w-[80vw]  md:w-[50vw] lg:w-[40vw]"
                >
                  <h3 className="mt-6 mb-2 font-bold text-2xl text-center">
                    Card Details
                  </h3>
                  <div className="absolute top-4 right-4 ">
                    <button
                      className="outline-none hover:invert-[20%] transition-all duration-200"
                      onClick={() => handleEdit()}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img className="w-8 h-8" src="/edit.svg" alt="" />
                    </button>
                    <button
                      className="ml-4 outline-none hover:invert-[20%] transition-all duration-200"
                      onClick={() => handleDelete()}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img className="w-8 h-8" src="/trash.svg" alt="" />
                    </button>
                    <button
                      className="ml-4 outline-none hover:invert-[20%] transition-all duration-200"
                      onClick={() => setOpenDetailModal(false)}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img className="w-8 h-8" src="/x-circle.svg" alt="" />
                    </button>
                  </div>

                  <div className="bg-white mt-8 px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={cardDetails?.url}  alt={cardDetails?.author} className="mx-auto" />
                    </div>
                    <div className="my-4">
                      <p>
                        <strong className="text-gray-800">Id : </strong>
                        <span className="text-gray-500">
                          {cardDetails?.id}
                        </span>{" "}
                      </p>
                      <p>
                        <strong className="text-gray-800">Author : </strong>{" "}
                        <span className="text-gray-500">
                          {cardDetails?.author}
                        </span>{" "}
                      </p>
                      <p>
                        <strong className="text-gray-800">
                          {" "}
                          Download Url :{" "}
                        </strong>{" "}
                        <a
                          href={cardDetails?.url}
                          target="_blank"
                          className="text-blue-400 hover:text-blue-500 outline-none"
                        >
                          {cardDetails?.url}
                        </a>
                      </p>
                    </div>
                  </div>
                </Dialog.Panel>
              ) : (
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <h3 className="mt-6 mb-2 font-bold text-2xl text-center">
                    Edit Card
                  </h3>
                  <div className="absolute top-4 right-4 ">
                    <button
                      className="outline-none hover:invert-[20%] transition-all duration-200"
                      onClick={() => handleEdit(true)}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img className="w-8 h-8" src="/edit.svg" alt="" />
                    </button>
                    <button
                      className="ml-4 outline-none hover:invert-[20%] transition-all duration-200"
                      onClick={() => handleDelete()}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img className="w-8 h-8" src="/trash.svg" alt="" />
                    </button>
                    <button
                      className="ml-4 outline-none hover:invert-[20%] transition-all duration-200"
                      onClick={() => {
                        setOpenDetailModal(false);
                      }}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img className="w-8 h-8" src="/x-circle.svg" alt="" />
                    </button>
                  </div>

                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 mt-4">
                    <form onSubmit={updateCard} className="my-4 mx-8">
                      <div className="my-4">
                        <Input
                          handler={handleChange}
                          type={"text"}
                          hint={"Enter Id"}
                          name={"id"}
                          value={fields.id}
                        />
                      </div>
                      <div className="my-4">
                        <Input
                          handler={handleChange}
                          type={"text"}
                          hint={"Enter Author Name"}
                          name={"author"}
                          value={fields.author}
                        />
                      </div>
                      <div className="my-4">
                        <Input
                          handler={handleChange}
                          type={"url"}
                          hint={"Enter Image Url"}
                          name={"download_url"}
                          value={fields.download_url}
                        />
                      </div>
                      <div className="mt-8 text-center">
                        <Input
                          handler={handleChange}
                          type={"submit"}
                          value={"Update Card"}
                          classes={`bg-blue-500 !px-8 !py-2 text-white border-0 w-max text-center hover:bg-blue-600 cursor-pointer transition-all duration-200 rounded-md`}
                        />
                      </div>
                    </form>
                  </div>
                </Dialog.Panel>
              )}
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  ) : (
    <Transition.Root show={showConfirmDialog} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        initialFocus={cancelButtonRef}
        onClose={setShowConfirmDialog}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-50 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                      <ExclamationTriangleIcon
                        className="h-6 w-6 text-red-600"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-base font-semibold leading-6 text-gray-900"
                      >
                        Delete Card
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Are you sure you want to delete the card? This action
                          cannot be undone.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                    onClick={() => deleteCard(cardDetails.id)}
                  >
                    Delete
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={() => setShowConfirmDialog(false)}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
