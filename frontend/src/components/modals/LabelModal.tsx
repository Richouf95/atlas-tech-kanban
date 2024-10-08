"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import CardLabel from "../dashboardComponents/board/CardLabel";
import AddIcon from "@mui/icons-material/Add";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import { LabelType } from "@/types";
import { createLabel } from "@/lib/labelsActions";
import { usePathname, useRouter } from "next/navigation";
import { addLabel } from "@/store/reducers/labels/labelsSlice";
import { updateCardLabel } from "@/lib/cardsActions";
import { setCards } from "@/store/reducers/cards/cardsSlice";

function LabelModal({ id, label }: { id: string; label?: LabelType | string }) {
  const theme = useSelector((state: RootState) => state.theme.theme);
  const allLabels = useSelector((state: RootState) => state.labels.labels);
  const cards = useSelector((state: RootState) => state.cards.cards);
  const [open, setOpen] = React.useState(false);
  const [addLabelOpen, setAddLabel] = React.useState<boolean>(false);
  const [labelData, setLabelData] = React.useState<any>({
    name: "",
    color: "#ff5733",
  });
  const pathName = usePathname();
  const pathNameSplited = pathName.split("/");
  const boardId = pathNameSplited[pathNameSplited.length - 1];
  const dispatch = useDispatch();
  const router = useRouter();

  React.useEffect(() => {
    router.refresh();
  }, [addLabelOpen]);

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

  const handleNewLabel = React.useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        await createLabel(labelData.name, labelData.color, boardId);
      } catch (error) {
        console.error("Erreur lors de la création d'une label :", error);
      } finally {
        setAddLabel(false);
        handleClose();
      }
    },
    [labelData, allLabels, dispatch, boardId, addLabelOpen]
  );

  const handleAssignedLabel = React.useCallback(async (labelId: string) => {
    try {
      await updateCardLabel(id, labelId);
    } catch (error) {
      console.error("Erreur lors de la updating d'une label :", error);
    } finally {
      handleClose();
    }
  }, []);

  return (
    <>
      <div
        className="my-2 rounded-xl columCards cursor-pointer"
        onClick={handleOpen}
      >
        {label ? (
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
            {addLabelOpen && (
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
                      placeholder="Label name ..."
                      value={labelData.name}
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
                    <div>
                      <DoneIcon
                        className="ml-2 cursor-pointer"
                        onClick={handleNewLabel}
                      />
                    </div>
                    <div>
                      <CloseIcon
                        className="cursor-pointer"
                        onClick={() => setAddLabel(false)}
                      />
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
                    key={x._id}
                    className="px-4 py-1 bg-gray-200 rounded-xl text-sm cursor-pointer"
                    style={{ backgroundColor: x.color }}
                    onClick={() => handleAssignedLabel(x._id)}
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
