import React from "react";
import './MoreButton.css';

function MoreButton({onClickMore}) {
    function handleMore() {
      onClickMore()
    }
    return (
      <>
        <button className='movies__button' type='button' onClick={handleMore}>
              Ещё
        </button>
      </>
    )
    }

    export default MoreButton