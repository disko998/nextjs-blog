import React from 'react'
import Head from 'next/head'
import Link from 'next/link'

import Alert from '../components/alert'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { getSortedPostsData } from '../lib/post'
import Date from '../components/date'

export default function Home({ allPostsData }) {
    const [showAlert, setShowAlert] = React.useState(false)
    const random = Math.round(Math.random() * 1)

    React.useEffect(() => {
        if (showAlert) {
            setTimeout(() => setShowAlert(false), 2000)
        }
    }, [showAlert])

    return (
        <Layout home>
            <Head>
                <title>{siteTitle}</title>
            </Head>

            {showAlert && (
                <Alert
                    message='This is simple alert'
                    type={random === 1 ? 'success' : 'error'}
                />
            )}

            <section
                className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}
            >
                <h2 className={utilStyles.headingLg}>Blog</h2>
                <ul className={utilStyles.list}>
                    {allPostsData.map(({ id, date, title }) => (
                        <li className={utilStyles.listItem} key={id}>
                            <Link href={`/posts/${id}`}>
                                <a>{title}</a>
                            </Link>
                            <br />
                            <small className={utilStyles.lightText}>
                                <Date dateString={date} />
                            </small>
                        </li>
                    ))}
                </ul>
            </section>

            <button onClick={() => setShowAlert(true)}>Show Alert</button>
        </Layout>
    )
}

export async function getStaticProps() {
    const allPostsData = getSortedPostsData()
    return {
        props: {
            allPostsData,
        },
    }
}
