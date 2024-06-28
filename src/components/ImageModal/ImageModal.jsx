import Modal from "react-modal";

Modal.setAppElement("#root");

export default function ImageModal({ isOpen, closeModal, imageUrl }) {
    const customStyles = {
        content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
        },
    };

    return (
        <Modal isOpen={isOpen} onRequestClose={closeModal} shouldCloseOnEsc={true} shouldCloseOnOverlayClick={true} style={customStyles}>
            {imageUrl && <img src={imageUrl} style={{ width: "500px", height: "500px" }} />}
        </Modal>
    );
}
