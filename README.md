# TODO

1. `Zettelkasten` notes should derive their _slug_ from somewhere else besides the FS path
   - Since they are now imported from `org-roam` which is a flat structure
2. `Zettelkasten` explain somewhere what it is (possibly a reference to a zettl page)
3. Add a disclaimer somewhere that the wiki is not meant to be a reference
4. Show orphaned pages somewhere (those zettl notes that have 0 backlinks [aren't linked to anywhere])
5. Exclude `Index` from backlinks of a page
6. Get information from wikidata were possible
   - Especially the _official website_ claim. This only if the tag in the file doesn't exist or is _null_
   - Also add explanation about this in the _about this site_ page
7. Handle when _wikidata QID_ is _null_ or not provided
   - This can also be extended to handle when any property is null or not provided
8. Include a page with github stars somewhere
9. clean up the broken links page
10. Zettl review page which shows old notes that need to be reviewd
    - Maybe items which havent' been reviewed in more than a year are shown in this special page
    - Some pages may be tagged with a `needs-to-be-reviewed` bool, so that we only review those items which may change (eg, documentation for an external service)
11. Make posts able to link to Zettl pages
12. In a post, show which external Zettl pages are used (if any)
13. Make Zettle pages show which posts link to them (but don't include them in the backlinks section)
14. Component to query from wikidata (to display "real information)
    - Either query as part of the page hydration (during gatsby build) or the component dynamically queries from the client on page render
15. `edit in github` for wiki pages
    - edit for existing pages
    - offer to create it if the wiki page does not exist
      - for this, the wikiLink component should be updated to redirect to a _new_ page telling that the "item with ID" does not exist
16. would be nice to list the commits that changed a wiki page (maybe something like page history)
    - If we do this then the "created at" file date is no longer necessary, since we can get the "last modified" from git
    - I created [an issue](https://github.com/PMudra/gatsby-source-local-git/issues/285) in the existing Git source plugin for Gatsby which should implement the bulk of this functionality
17. Expose an URL `/ext/wid/{wid}` that will redirect to the internal item identified by `wid` internally
    - this is for external integration
    - add a _link to this page_ button in wiki page which copies the appropiate _external link_ for the page
18. search (posts and zettl notes)
19. make headlines foldable
20. add creative commons disclaimer to wiki item (footer?)
21. Investigate the concept of `namespaces` to separate Zettl notes
22. Create a graph of depth N
    - Interesting for all the wiki notes starting (with depth = inf)
    - And also for a given article (with actual depth)
    - Would also be interesting to have a graph for a post, which shows supporting zettl notes up to a depth `N`
23. Add a Journal section
    - with calendar like org-mode
    - one file per day
24. Add some way to make final page(s) private (maybe basic user:pass)
25. magician
26. clean up the "index wiki page"


## Posts

- Certbot with nginx on ubuntu (digitalocean)
