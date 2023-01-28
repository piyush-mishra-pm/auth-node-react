import React from 'react';
import Modal, {ModalProps} from './Modal';

function ErrorModal(props: ModalProps) {
  return (
    <Modal
      header={<h2>{props.header}</h2>}
      onCloseModal={props.onCloseModal}
      content={props.content}
      modalActions={
        <button className="ui button negative" onClick={props.onCloseModal}>
          OK
        </button>
      }
    />
  );
}

export default ErrorModal;
