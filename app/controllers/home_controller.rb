class HomeController < ApplicationController
  def index
    twitter_timeline_hub = TwitterTimelineHub.new(TwitterClientFactory.new.call)
    @tweets = twitter_timeline_hub.call("margonline")[:tweets]
  end

end