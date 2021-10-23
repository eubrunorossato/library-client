import { Button, Modal } from 'react-materialize';
import './_modal.css'

const ModalShared = (props) => {
    return (
        <Modal
            actions={[
                <Button flat modal="close" node="button" waves="green" onClick={props.closeModal}>Close</Button>
            ]}
            bottomSheet={false}
            fixedFooter={false}
            header={`Scheduler - ${props.book.name}`}
            id="Modal-10"
            open={props.isOpen}
            options={{
                dismissible: true,
                endingTop: '10%',
                inDuration: 250,
                onCloseEnd: props.closeModal,
                onCloseStart: null,
                onOpenEnd: null,
                onOpenStart: null,
                opacity: 0.5,
                outDuration: 250,
                preventScrolling: true,
                startingTop: '4%'
            }}
        >
            <div>
                {props.children}
            </div>
        </Modal>
    )
};

export default ModalShared;