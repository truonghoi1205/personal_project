import { Button, Modal } from "react-bootstrap";

function FormDelete({ showModal, handleClose, confirmDelete }) {
    return (
        <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Xác nhận xóa</Modal.Title>
            </Modal.Header>
            <Modal.Body>Bạn có chắc chắn muốn xóa sản phẩm này?</Modal.Body>
            <Modal.Footer>
                <Button variant="danger btn-sm" onClick={confirmDelete}>
                    Xóa
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default FormDelete;
