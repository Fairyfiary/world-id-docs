import { TOC } from 'common/types'
import { Fragment, memo, useEffect, useState } from 'react'
import { Items } from './Items'

export const TableOfContent = memo(function TableOfContent(props: {
  items: TOC
}) {
  const [activeItem, setActiveItem] = useState<string>()

  useEffect(() => {
    const handler: IntersectionObserverCallback = (entries) => {
      entries.map((entry) => {
        if (entry.isIntersecting) {
          setActiveItem(entry.target.id)
        }
      })
    }

    const io = new IntersectionObserver(handler, {
      rootMargin: '100px 0px -50% 0px',
    })

    const article = document.querySelector('article')

    if (!article) {
      return
    }

    const observableItems = Array.from(
      article.querySelectorAll('h1,h2,h3,h4,h5,h6')
    )

    observableItems.map((item) => io.observe(item))

    return () => {
      observableItems.map((item) => io.unobserve(item))
    }
  }, [])

  return (
    <Fragment>
      <span className="font-medium text-161b22 dark:text-ffffff">
        On this page
      </span>

      <nav className="grid gap-y-6">
        <Items items={props.items} activeItem={activeItem} />
      </nav>
    </Fragment>
  )
})
