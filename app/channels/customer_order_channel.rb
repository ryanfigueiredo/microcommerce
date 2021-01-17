class CustomerOrderChannel < ApplicationCable::Channel
  def subscribed
    stream_from "customer_order_channel"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
