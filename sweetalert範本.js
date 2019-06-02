//Import SweetAlert2
import Swal from 'sweetalert2'


//Success---noButton
Swal.fire({
  // position: 'top-end',
  type: 'success',
  title: '<span style="color:#d4d1cc">登入成功</span>',
  showConfirmButton: false,
  buttonsStyling: false,
  background: '#242b34',
  timer: 1500,
})
//Success---withButton
Swal.fire({
  // position: 'top-end',
  type: 'success',
  title: '<span style="color:#d4d1cc">登入成功</span>',
  showConfirmButton: true,
  confirmButtonClass: 'btn btn-warning',
  confirmButtonColor: '#ffa510',
  buttonsStyling: false,
  background: '#242b34',
  timer: 3000,
})

//Error---noButton
Swal.fire({
  type: 'error',
  title: '<span style="color:#d4d1cc">帳號或密碼錯誤</span>',
  showConfirmButton: false,
  buttonsStyling: false,
  background: '#242b34',
  timer: 1500,
})
//Error---withButton
Swal.fire({
  type: 'error',
  title: '<span style="color:#d4d1cc">帳號或密碼錯誤</span>',
  showConfirmButton: true,
  confirmButtonClass: 'btn btn-warning',
  confirmButtonColor: '#ffa510',
  buttonsStyling: false,
  background: '#242b34',
  timer: 3000,
})

//Toast--- (top/center/bottom)-(start/center/end) ex: top-end
const Toast = Swal.mixin({
  toast: true,
  position: 'center',
  showConfirmButton: false,
  timer: 2000,
})
Toast.fire({
  type: 'success',
  title: '歡迎加入Movieee，將為您跳轉至會員中心!',
})

//是非
const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: 'btn btn-success',
    cancelButton: 'btn btn-danger',
  },
  buttonsStyling: false,
  background: '#242b34',
})
swalWithBootstrapButtons.fire({
  title: 'Are you sure?',
  text: "You won't be able to revert this!",
  type: 'warning',
  showCancelButton: true,
  confirmButtonText: 'Yes, delete it!',
  cancelButtonText: 'No, cancel!',
  reverseButtons: true
}).then((result) => {
  if (result.value) {
    swalWithBootstrapButtons.fire(
      'Deleted!',
      'Your file has been deleted.',
      'success'
    )
  } else if (
    // Read more about handling dismissals
    result.dismiss === Swal.DismissReason.cancel
  ) {
    swalWithBootstrapButtons.fire(
      'Cancelled',
      'Your imaginary file is safe :)',
      'error'
    )
  }
})
//是非範例2
Swal.fire({
  // position: 'top-end',
  title: '請先登入會員',
  text: '請點選確認繼續或取消離開',
  type: 'question',
  showCancelButton: true,
  confirmButtonText: '確認',
  cancelButtonText: '取消',
  // cancelButtonColor: ' #d33',
  confirmButtonClass: ' btn-warning',
  confirmButtonColor: '#ffa510',
  background: '#242b34',
}).then(result => {
  // 確認有按下上傳確認鍵後開始FETCH
  if (result.value) {
    window.location.href = '/LoginSign'
  }
})


//文字顏色HTML
<span style="color:#d4d1cc">
</span>
