import React from 'react'

const ActivityJoinForm = props => (
  <>
    <div className="col-12 col-sm-12 col-md-12 col-lg-12 mt-5">
      <form
        action="https://formspree.io/aatung0913@gmail.com"
        method="POST"
        onSubmit={props.handleOnSubmit}
      >
        <div class="form-group">
          <label for="memberAccount">會員姓名</label>
          <input
            type="text"
            class="form-control form-control-plaintext"
            id="memberAccount"
            name="memberAccount"
            value={props.memberAccount}
            readonly
            style={{ color: '#ffa510' }}
          />
        </div>
        <div class="form-group">
          <label for="memberEmail">會員信箱</label>
          <input
            type="text"
            class="form-control form-control-plaintext"
            id="memberEmail"
            name="memberEmail"
            value={props.memberEmail}
            readonly
            style={{ color: '#ffa510' }}
          />
        </div>
        <div class="form-group">
          <label for="joinName">報名人姓名</label>
          <input
            type="text"
            class="form-control form-control-plaintext"
            id="joinName"
            name="joinName"
            placeholder="請輸入報名者姓名"
            style={{ border: '2px solid #ffa510', color: '#ffa510' }}
          />
        </div>
        <div class="form-group">
          <label for="joinPhone">報名人聯絡電話</label>
          <input
            type="text"
            class="form-control form-control-plaintext"
            id="joinPhone"
            name="joinPhone"
            placeholder="請輸入聯絡電話"
            style={{ border: '2px solid #ffa510', color: '#ffa510' }}
          />
        </div>

        <button type="submit" class="btn btn-warning">
          送出
        </button>
      </form>
    </div>
  </>
)

export default ActivityJoinForm
