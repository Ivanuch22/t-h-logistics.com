export type ConfirmModalProps = {
    isVisible: boolean;
    message?: string;
    onClose: () => {};
    onSubmit: ()=>{}
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
    isVisible = false,
    onClose,
    message,onSubmit
}) => {

    return (
        <div id="ConfirmModal" className="modal fade show" style={{background: 'rgba(0, 0, 0, .3)', display: isVisible ? 'block' : 'none'}}>
            <div className="modal-dialog modal-confirm">
                <div className="modal-content">
                    <div className="modal-header">
                        <div className="icon-box">
                        <i className="fas fa-check"></i>
                        </div>
                        <h4 className="modal-title w-100">{message}</h4>
                    </div>
                    <div className="modal-body">
                        <p className="text-center"></p>
                    </div>
                    <div className='d-flex justify-content-between'>
                    <button className="btn btn-success" data-dismiss="modal" onClick={onSubmit} style={{width: '48%'}}>OK</button>
                    <button className="btn btn-danger" data-dismiss="modal" onClick={onClose} style={{width: '48%', background: "red !important"}}>Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ConfirmModal;