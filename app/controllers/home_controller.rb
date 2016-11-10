class HomeController < ApplicationController
  def index
    @tweets = TwitterTimelineHub.new(TwitterClientFactory.new.call).call("margonline")[:tweets]
  end

end