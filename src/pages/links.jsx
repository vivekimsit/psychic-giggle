import Head from 'next/head'
import links from '@/data/links.json'

export default function Links() {
  return (
    <>
      <Head>
        <title>Links - Vivek Poddar</title>
        <meta name="links" content="A collection of links that I like." />
      </Head>
      <main className="mx-auto mt-8 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-base font-semibold leading-6 text-gray-900">
                Links
              </h1>
              <p className="mt-2 text-sm text-gray-700">
                A collection of links that I like.
              </p>
            </div>
          </div>
          <div className="mx-auto mt-8 flow-root max-w-3xl">
            <div className="-mx-4 -my-2 sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle">
                <table className="min-w-full border-separate border-spacing-0">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8"
                      >
                        Key
                      </th>
                      <th
                        scope="col"
                        className="sticky top-0 z-10 hidden border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:table-cell"
                      >
                        Value
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {links
                      .filter((link) => !link.private)
                      .map((link, personIdx) => (
                        <tr key={link.key}>
                          <td
                            className={classNames(
                              personIdx !== links.length - 1
                                ? 'border-b border-gray-200'
                                : '',
                              'whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8'
                            )}
                          >
                            {link.key}
                          </td>
                          <td
                            className={classNames(
                              personIdx !== links.length - 1
                                ? 'border-b border-gray-200'
                                : '',
                              'hidden whitespace-nowrap px-3 py-4 text-sm text-gray-500 sm:table-cell'
                            )}
                          >
                            {link.value}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function MyLink({ href, children }) {
  return (
    <a href={href} rel="noopener noreferrer" target="_blank">
      {children}
    </a>
  )
}
