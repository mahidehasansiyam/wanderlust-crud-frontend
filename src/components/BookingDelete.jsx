'use client';



import { authClient } from '@/lib/auth-client';
import { TrashBin } from '@gravity-ui/icons';
import { AlertDialog, Button } from '@heroui/react';
const BookingDelete = ({ bookingId }) => {

  const handleCancelBooking = async () => {

    // get token from better auth in client component *****************
    const { data: tokenData } = await authClient.token();
    const res = await fetch(`http://localhost:5000/bookings/${bookingId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${tokenData?.token}`,
      },
    })
    const data = await res.json();
    window.location.reload();
  };

  return (
    <AlertDialog>
      <Button
        className={' rounded-none border-red-500 text-red-500'}
        variant="outline"
      >
        <TrashBin /> Cancel
      </Button>

      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-[400px]">
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading>
                Cancel Project permanently?
              </AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body></AlertDialog.Body>
            <AlertDialog.Footer>
              <Button slot="close" variant="tertiary">
                Cancel
              </Button>
              <Button
                onClick={handleCancelBooking}
                slot="close"
                variant="danger"
              >
                Delete
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
};

export default BookingDelete;
