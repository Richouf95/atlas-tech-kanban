"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import NewRoom from "../forms/boardForms/NewRoom";
import { usePathname } from "next/navigation";
import NewProjectRoom from "../forms/boardForms/NewProjectRoom";

function NewRoomModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const theme = useSelector((state: RootState) => state.theme.theme);
  const pathName = usePathname();

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "90%",
    maxWidth: 400,
    boxShadow: 24,
    p: 4,
    bgcolor: theme === "light" ? "#ffffff" : "#333333",
    color: theme === "light" ? "#000000" : "#ffffff",
    border: "none",
    outline: "none",
    borderRadius: 5,
    marginLeft: "auto",
    marginRight: "auto",
  };

  return (
    <>
      <div
        className="roomCard w-full h-28 rounded-lg flex items-center px-5 cursor-pointer"
        onClick={handleOpen}
      >
        <span className="text-xl">+ New Board</span>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          {pathName === "/dashboard" ? <NewRoom /> : <NewProjectRoom />}
        </Box>
      </Modal>
    </>
  );
}

export default NewRoomModal;

// "use client";

// import * as React from "react";
// import Box from "@mui/material/Box";
// import Typography from "@mui/material/Typography";
// import Modal from "@mui/material/Modal";
// import { useSelector } from "react-redux";
// import { RootState } from "@/store/store";

// function NewRoomModal() {
//   const [open, setOpen] = React.useState(false);
//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);

//   const theme = useSelector((state: RootState) => state.theme.theme);

//   const modalStyle = {
//     position: "absolute",
//     top: "50%",
//     left: "50%",
//     transform: "translate(-50%, -50%)",
//     width: 400,
//     boxShadow: 24,
//     p: 4,
//     bgcolor: theme === "light" ? "#ffffff" : "#333333",
//     color: theme === "light" ? "#000000" : "#ffffff",
//     border: "none",
//     outline: "none",
//     borderRadius: 5
//   };

//   return (
//     <>
//       <div
//         className="roomCard w-full h-28 rounded-lg flex items-center px-5 cursor-pointer"
//         onClick={handleOpen}
//       >
//         <span className="text-xl">+ New Board</span>
//       </div>

//       <Modal
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="modal-modal-title"
//         aria-describedby="modal-modal-description"
//       >
//         <Box sx={modalStyle}>
//           <Typography id="modal-modal-title" variant="h6" component="h2">
//             Text in a modal
//           </Typography>
//           <Typography id="modal-modal-description" sx={{ mt: 2 }}>
//             Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
//           </Typography>
//         </Box>
//       </Modal>
//     </>
//   );
// }

// export default NewRoomModal;
