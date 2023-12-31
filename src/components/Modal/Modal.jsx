import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Backdrop, StyledCloseIcon, StyledModal } from './Modal.styled';

Modal.propTypes = {
  onClose: PropTypes.func,
};

export function Modal({ onClose, children }) {
  useEffect(() => {
    document.addEventListener('keydown', handleEscPress);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscPress);
      document.body.style.overflow = 'visible';
    };
  });

  function handleBackdropClick(ev) {
    if (ev.target === ev.currentTarget) {
      onClose();
    }
  }

  function handleEscPress(ev) {
    if (ev.key === 'Escape') {
      onClose();
    }
  }

  return (
    <Backdrop onClick={handleBackdropClick} data-backdrop>
      <StyledModal>
        <button type='button' aria-label='Close Button' onClick={onClose}>
          <StyledCloseIcon />
        </button>
        {children}
      </StyledModal>
    </Backdrop>
  );
}
