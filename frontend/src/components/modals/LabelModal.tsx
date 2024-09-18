"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import CardLabel from "../dashboardComponents/board/CardLabel";
import AddIcon from "@mui/icons-material/Add";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import { Card, LabelType } from "@/types";
import { useMutation, useStorage } from "@/app/liveblocks.config";
import { LiveList, shallow } from "@liveblocks/client";
import { LiveObject } from "@liveblocks/core";
import uniqid from "uniqid";

function LabelModal({ id, label }: { id: string; label?: LabelType | string }) {
  const theme = useSelector((state: RootState) => state.theme.theme);
  const [open, setOpen] = React.useState(false);
  const [addLabel, setAddLabel] = React.useState<boolean>(false);
  const [labelData, setLabelData] = React.useState<any>({
    name: "",
    color: "#ff5733",
  });
  const [labelCreated, setLabelCreated] = React.useState<any>();

  // const allLabels = useStorage(
  //   (root) => root.labels.map((label) => ({ ...label })),
  //   shallow
  // );

  const isLargeScreen = useMediaQuery("(min-width: 1024px)");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: isLargeScreen ? 400 : 260,
    p: 2,
    bgcolor: theme === "light" ? "#ffffff" : "#333333",
    color: theme === "light" ? "#000000" : "#ffffff",
    border: "none",
    outline: "none",
    borderRadius: 5,
  };

  // const newLabel = useMutation(({ storage }, labelData) => {
  //   const labels = storage.get("labels");
  //   const initialLabels = new LiveList([]);

  //   if (!labels) {
  //     storage.set("labels", initialLabels);
  //   }

  //   const labelId = uniqid("label-");

  //   const newLabelData = new LiveObject({
  //     id: labelId,
  //     ...labelData,
  //   });

  //   return storage.get("labels").push(newLabelData);
  // }, []);

  // const updateCardLabel = useMutation(({ storage }, cardId, updateData) => {
  //   const cards = storage.get("cards");
  //   const index = cards.findIndex((card) => card.toObject().id === cardId);
  //   const thisCard = storage.get("cards").get(index);
  //   for (let key in updateData) {
  //     thisCard?.set(key as keyof Card, updateData[key]);
  //   }
  // }, []);

  const handleNewLabel = async (e: React.FormEvent) => {
    e.preventDefault();
    // newLabel(labelData);
    setAddLabel(false);
    handleClose();
  };

  const thisCardId = id;

  const handleAssignedLabel = async (
    labelid: string,
    name: string,
    color: string
  ) => {
    // updateCardLabel(thisCardId, {
    //   label: {
    //     id: labelid,
    //     name,
    //     color,
    //   },
    // });
    handleClose();
  };

  return (
    <>
      <div
        className="my-2 rounded-xl columCards cursor-pointer"
        onClick={handleOpen}
      >
        {typeof label !== "string" && label.name !== "N/A" ? (
          <CardLabel id={id} label={label} />
        ) : (
          <span
            className={`px-4 py-1 rounded-xl ${
              theme === "light" ? "bg-[#D7D7D7]" : "bg-[#212121]"
            }`}
          >
            Add label
          </span>
        )}
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <div className="overflow-y-auto">
            <div className="grid grid-cols-12">
              <div className="col-span-11">
                <h2 className="text-center font-bold text-xl">Choose label</h2>
              </div>
              <div className="col-span-1">
                <div
                  className="cursor-pointer"
                  onClick={() => setAddLabel(true)}
                >
                  <AddIcon />
                </div>
              </div>
            </div>
            {addLabel && (
              <form
                onSubmit={handleNewLabel}
                className={`${
                  theme === "light" ? "bg-[#D7D7D7]" : "bg-[#212121]"
                } p-2 rounded-lg`}
              >
                <div className="flex items-center justify-between mx-2">
                  <div className="flex items-center">
                    <label htmlFor="LabelName"></label>
                    <input
                      type="text"
                      name="LabelName"
                      autoFocus
                      id="LabelName"
                      placeholder={"Label name ..."}
                      onChange={(e) =>
                        setLabelData({ ...labelData, name: e.target.value })
                      }
                      className="w-full text-black mr-2"
                    />
                    <input
                      type="color"
                      id="colorPicker"
                      onChange={(e) =>
                        setLabelData({ ...labelData, color: e.target.value })
                      }
                      value={labelData.color}
                      className="w-20 h-8 p-0 cursor-pointer colorPicker"
                    />
                  </div>
                  <div className="flex gap-2">
                    <div onClick={handleNewLabel}>
                      <DoneIcon className="ml-2 cursor-pointer" />
                    </div>
                    <div onClick={() => setAddLabel(false)}>
                      <CloseIcon className="cursor-pointer" />
                    </div>
                  </div>
                </div>
              </form>
            )}
            <div className="flex flex-wrap gap-2 justify-center my-4">
              {allLabels &&
                allLabels.length > 0 &&
                allLabels.map((x) => (
                  <p
                    key={x.id}
                    className="px-4 py-1 bg-gray-200 rounded-xl text-sm cursor-pointer"
                    style={{ backgroundColor: x.color }}
                    onClick={() => handleAssignedLabel(x.id, x.name, x.color)}
                  >
                    {x.name}
                  </p>
                ))}
            </div>
            {allLabels && allLabels.length === 0 && (
              <>
                <p className="font-bold text-center text-xl">No Labels !</p>
                <p className="text-center">please create one ...</p>
              </>
            )}
          </div>
        </Box>
      </Modal>
    </>
  );
}

export default LabelModal;
