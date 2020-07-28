# TODO

1. Make script that exports `org-roam` able of handling "tags"
2. `Zettelkasten` explain somewhere what it is (possibly a reference to a zettl page)
3. Add a disclaimer somewhere that the wiki is not meant to be a reference
4. Show orphaned pages somewhere (those zettl notes that have 0 backlinks [aren't linked to anywhere])
5. clean up the broken links page
6. Zettl review page which shows old notes that need to be reviewd
   - Maybe items which havent' been reviewed in more than a year are shown in this special page
   - Some pages may be tagged with a `needs-to-be-reviewed` bool, so that we only review those items which may change (eg, documentation for an external service)
7. Make posts able to link to Zettl pages
8. In a post, show which external Zettl pages are used (if any)
9. Make Zettle pages show which posts link to them (but don't include them in the backlinks section)
10. Component to query from wikidata (to display "real information)
    - Either query as part of the page hydration (during gatsby build) or the component dynamically queries from the client on page render
11. `edit in github` for wiki pages
    - edit for existing pages
    - offer to create it if the wiki page does not exist
      - for this, the wikiLink component should be updated to redirect to a _new_ page telling that the "item with ID" does not exist
12. would be nice to list the commits that changed a wiki page (maybe something like page history)
    - If we do this then the "created at" file date is no longer necessary, since we can get the "last modified" from git
    - I created [an issue](https://github.com/PMudra/gatsby-source-local-git/issues/285) in the existing Git source plugin for Gatsby which should implement the bulk of this functionality
13. Expose an URL `/ext/wid/{wid}` that will redirect to the internal item identified by `wid` internally
    - this is for external integration
    - add a _link to this page_ button in wiki page which copies the appropiate _external link_ for the page
14. search (posts and zettl notes)
15. make headlines foldable
16. add creative commons disclaimer to wiki item (footer?)
17. Investigate the concept of `namespaces` to separate Zettl notes
18. Create a graph of depth N
    - Interesting for all the wiki articles starting (with depth = inf)
    - And also for a given article (with actual depth)
    - Would also be interesting to have a graph for a post, which shows supporting zettl notes up to a depth `N`
19. Add a Journal section
    - with calendar like org-mode
    - one file per day
20. Add some way to make final page(s) private (maybe basic user:pass)
21. magician
22. clean up the "index wiki page"


## Posts

- Certbot with nginx on ubuntu (digitalocean)
