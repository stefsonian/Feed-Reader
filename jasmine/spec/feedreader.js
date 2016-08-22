$(function() {

    describe('RSS Feeds', function() {

        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        it('has a url for each feed', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });
        });

        it('has a name for each feed', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            });
        });         
    });

    describe('The menu', function() {

        it('starts with the menu hidden as default', function() {
            var menuIsHidden = $('body').hasClass('menu-hidden');
            expect(menuIsHidden).toBe(true);
        });
        
        it('changes visibility when the menu icon is clicked', function() {
            var menuIcon = $('.menu-icon-link');

            // First check the assumption that the menu is hidden
            expect($('body').hasClass('menu-hidden')).toBe(true);

            // Then trigger the click event twice to first show then hide the menu
            menuIcon.trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(false);

            menuIcon.trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

    });

    describe('Initial Entries', function() {
         
        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });

        it('has at least one entry in the feed', function(done) {
            var entryCount = $('.feed').find('.entry').length;
            expect(entryCount).toBeGreaterThan(0);
            done();
        });
    });

    describe('New Feed Selection', function() {

        // Load two feeds and record the text of the first post for each feed.
        var previousFirstPost;
        var newFirstPost;

        beforeEach(function(done) {
            // Load first feed
            loadFeed(0, function() {
                var previousFirstPostHTML = $('.feed').find('.entry').find('h2')[0];
                previousFirstPost = $(previousFirstPostHTML).text();

                // Load next feed once the first load has been completed and recorded
                loadFeed(1, function() {
                    var newFirstPostHTML = $('.feed').find('.entry').find('h2')[0];
                    newFirstPost = $(newFirstPostHTML).text();
                    done();
                });
            });
        });
        
        // If the feed texts are different, then content has changed.
        it('changes content when new feed is loaded', function(done) {
            expect(previousFirstPost).not.toBe(newFirstPost);
            done();
        });

        
    });

}());
