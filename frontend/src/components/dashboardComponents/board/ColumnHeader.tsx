import React, { FormEvent, useState, useCallback } from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Popover from "@mui/material/Popover";
import { useMutation } from "@/app/liveblocks.config";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { updateColumnName, deleteColumn } from "@/lib/columnsActions";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { setColumns } from "@/store/reducers/columns/columnsSlice";

function ColumnHeader({ id, name }: { id: string; name: string }) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [renameColumn, setRenameColumn] = useState<boolean>(false);
  const [newColumnName, setNewColumnName] = useState<string>(name);
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
  const columns = useSelector((state: RootState) => state.columns.columns);
  const dispatch = useDispatch();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteColumn = useCallback(
    async (id: string) => {
      try {
        const response = await deleteColumn(id);

        if (response && columns) {
          const updatedColumns = columns.filter((col) => col._id !== id);
          // dispatch(setColumns(updatedColumns));
        }
      } catch (error) {
        console.error("Erreur lors de la suppression de la colonne :", error);
      }
    },
    [columns, dispatch]
  );

  const handleChangeColumnName = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      try {
        const response = await updateColumnName(id, newColumnName);

        if (response && columns) {
          const updatedColumns = columns.map((col) =>
            col._id === id ? { ...col, name: newColumnName } : col
          );
          // dispatch(setColumns(updatedColumns));

          setRenameColumn(false);
        }
      } catch (error) {
        console.error(
          "Erreur lors de la modification du nom de la colonne :",
          error
        );
      }
    },
    [columns, dispatch, id, newColumnName]
  );

  const open = Boolean(anchorEl);
  const popoverId = open ? "simple-popover" : undefined;

  return (
    <div>
      {!renameColumn && (
        <div className="flex items-center justify-between rounded-xl cursor-pointer px-4 py-2 uniquement">
          <h2 className="text-lg font-bold">{name}</h2>
          <div onClick={handleClick}>
            <MoreHorizIcon aria-describedby={popoverId} />
          </div>
        </div>
      )}
      {renameColumn && (
        <form onSubmit={handleChangeColumnName} className="p-2">
          <div>
            <input
              type="text"
              name="colName"
              id="colName"
              value={newColumnName}
              onChange={(e) => setNewColumnName(e.target.value)}
              className="w-full text-black"
            />
          </div>
          <div className="flex justify-center mt-2 gap-2">
            <button type="submit" className="w-full">
              Save
            </button>
            <button onClick={() => setRenameColumn(false)} className="w-full">
              Cancel
            </button>
          </div>
        </form>
      )}

      <Popover
        id={popoverId}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        PaperProps={{
          sx: {
            minWidth: 200,
            maxWidth: 250,
          },
        }}
      >
        {!confirmDelete && (
          <div className="shadow-lg">
            <p
              onClick={() => {
                setRenameColumn(true);
                handleClose();
              }}
              className="p-2 m-2 rounded-lg cursor-pointer flex justify-between"
            >
              Rename column <EditIcon />
            </p>
            <p
              className="bg-red-300 p-2 m-2 rounded-lg cursor-pointer flex justify-between"
              onClick={() => setConfirmDelete(true)}
            >
              Delete <DeleteIcon />
            </p>
          </div>
        )}
        {confirmDelete && (
          <div className="text-center p-2">
            <p className="font-bold">Confirmation</p>
            <p>Do you want to delete this column?</p>
            <div className="flex justify-center mt-2 gap-2">
              <button
                className="w-full !bg-red-300"
                onClick={() => {
                  handleDeleteColumn(id);
                  setConfirmDelete(false);
                }}
              >
                Delete
              </button>
              <button
                onClick={() => setConfirmDelete(false)}
                className="w-full"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </Popover>
    </div>
  );
}

export default ColumnHeader;
