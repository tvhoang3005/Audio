import { useDispatch, useSelector } from 'react-redux';
import { toggleModal } from '../../store/uiSlice';

import './Modal.scss';

const Modal = () => {
    const dispatch = useDispatch();
    const isOpen = useSelector((state) => state.ui.isModalOpen);

    if (!isOpen) return null;

    const close = () => dispatch(toggleModal());

    return (
        <div className="modal">
            <div className="modal-container">
                <div className="modal-close">
                    <i className="ion-android-close" onClick={close}></i>
                </div>
                <div className="modal-title">
                    <p>Tạo playlist mới</p>
                </div>
                <div className="modal-input">
                    <input type="text" name="playlist" placeholder="Nhập tên playlist" />
                </div>
                <div className="modal-button" onClick={close}>
                    <button>Lưu</button>
                </div>
            </div>
            <div className="modal-hidden" onClick={close}></div>
        </div>
    );
};

export default Modal;
