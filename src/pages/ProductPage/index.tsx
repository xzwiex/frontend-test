import React, { useState } from 'react'
import {
    gql, useQuery
} from '@apollo/client'
import { Helmet } from 'react-helmet'
import { useHistory, useParams } from 'react-router';

import { RatingStars } from '../../components/RatingStars'
import {
    ProductQuery,
    ProductQuery_product_data_descriptionSections_TextProductDescriptionSection as TextSection
} from './__generated__/ProductQuery';
import { Button } from '../../components/Button'
import { H2, H3, H4, P } from '../../components/Typography';

import styles from './style.scss'

const PRODUCT_QUERY = gql`
    query ProductQuery($slug: String!) {
        product(input: { slug: $slug }) {
            data {
                id
                name
                brandInfo {
                  name
                }
                image(fullSizeImage: true)
                rating {
                  avgRate
                }
                reviews {
                  count
                }
                description
                type
                gender
                unit
                descriptionSections {
                    id
                    title
                    ...on TextProductDescriptionSection {
                        text
                    }
                }
            }
        }
    }  
`

interface Purchase {
    volume: number
    price: number
    isSubscription: boolean
}

// TODO: fetch from server
const PURCHASE_TYPES: { [s: string]: Purchase } = {
    SUBSCRIPTION: {
        volume: 1.7,
        price: 14.95,
        isSubscription: true,
    },
    PURCHASE_LARGE: {
        volume: 1.7,
        price: 9.99,
        isSubscription: false,
    },
    PURCHASE_SMALL: {
        volume: 1,
        price: 7.99,
        isSubscription: false,
    },
}

type PurchaseType = keyof typeof PURCHASE_TYPES

interface RouteParams {
    slug: string
}

interface ProductImageProps {
    url: string
    alt: string
}

function ProductImage(props: ProductImageProps) {
    return (
        <div className={styles.productImageContainer}>
            {/* TODO: pass sex, select correct icon */}
            <i className="fa"></i>
            <img className={styles.img} src={props.url} alt={props.alt} />
        </div>

    )
}

export function ProductPage() {

    const { slug } = useParams<RouteParams>()

    const { loading, error, data } = useQuery<ProductQuery>(PRODUCT_QUERY, { variables: { slug } });

    const [showMore, setShowMore] = useState(true)
    const [tabId, setTabId] = useState(0)
    const [purchaseType, setPurchaseType] = useState<PurchaseType>('SUBSCRIPTION');
    const history = useHistory()

    const purchase = PURCHASE_TYPES[purchaseType]

    if (loading) { // TODO: pretty loader and error 
        return <span>Loading...</span>
    }

    if (error || !data?.product.data) {
        return <span>Unexpected error occured. Please, try again later</span>
    }

    const { product: { data: pd } } = data

    const description = showMore ? `${pd.description?.slice(0, 100)}...` : pd.description

    const addToQueue = () => {
        // TODO: Send selected purchaseType to server
        history.push('/checkout')
    }


    // TODO: typings
    const textDescriptions: TextSection[] = pd.descriptionSections?.filter(_ => _.__typename === 'TextProductDescriptionSection') as TextSection[]
    const howItWorks = textDescriptions?.find(_ => _.id === 'howItWorks')
    const about = textDescriptions?.find(_ => _.id === 'about')
    return (
        <div className={styles.container}>
            <Helmet>
                <title>{pd.name} | Scentbird</title>
            </Helmet>
            <div className={styles.desktopImg}>
                <ProductImage url={pd.image} alt={pd.name} />
            </div>
            <div className={styles.content}>
                <H2 uppercase>{pd.brandInfo.name}</H2>
                <H2>{pd.name}</H2>
                <H4>{pd.type}</H4>
                {/* TODO: plural */}
                <H4 uppercase>Average rating (<span className={styles.reviewsCount}>{pd.reviews?.count} reviews</span>)</H4>
                <RatingStars rating={pd.rating?.avgRate || 0} />
                <div className={styles.mobileImg}>
                    <ProductImage url={pd.image} alt={pd.name} />
                </div>
                {/* Add to queue */}
                <div className={styles.addButtonContainer}>
                    <div className={styles.orderSummary}>
                        <img src={pd.image} className={styles.imgSmall} />
                        <div>
                            <p>{purchase.isSubscription ? 'Subscription price' : 'Purchase price'}: <b>${purchase.price}</b></p>
                            <p>Size: <b>{purchase.volume} oz</b></p>
                        </div>
                    </div>
                    <div className={styles.addToQueueContainer}>
                        <Button onClick={addToQueue} type="button">Add to queue</Button>
                    </div>
                </div>
                <div className={styles.typeSwitcher} >
                    {Object
                        .keys(PURCHASE_TYPES)
                        .map((pt) =>
                            <button key={`pt_${pt}`} className={`${styles.typeButton} ${purchaseType === pt ? styles.typeButtonSelected : ''}`} onClick={() => setPurchaseType(pt)}>
                                <img src={pd.image} className={styles.imgSmall} />
                                <span className={styles.typeButtonText}>
                                    <span>{PURCHASE_TYPES[pt].volume} oz</span>
                                    <span>
                                        {PURCHASE_TYPES[pt].isSubscription && ' Subscription'}
                                        {!PURCHASE_TYPES[pt].isSubscription &&
                                            <>
                                                <span> One-time</span>
                                                <span className={styles.showSm}> purchase</span>
                                            </>
                                        }
                                    </span>
                                </span>
                            </button>
                        )
                    }
                </div>
                <H3 className={styles.descriptionTitle} uppercase>Description</H3>
                <P>
                    {description}&nbsp;
                    <span onClick={() => setShowMore(!showMore)} className={styles.showMoreLink}>
                        {showMore ? 'Read more >' : 'Read less <'}
                    </span>
                </P>
                {/* TODO: Component? */}
                <div className={styles.tabs}>
                    <div className={styles.tabList}>
                        <div className={`${styles.tab} ${tabId == 0 ? styles.tabSelected : ''}`} onClick={() => setTabId(0)}>How it works</div>
                        <div className={`${styles.tab} ${tabId == 1 ? styles.tabSelected : ''}`} onClick={() => setTabId(1)}>About</div>
                    </div>
                    <div className={styles.tabPanels}>
                        {
                            tabId == 0 && <p className={styles.tabPanel} dangerouslySetInnerHTML={{ __html: howItWorks?.text || '' }}></p>
                        }
                        {
                            tabId == 1 && <p className={styles.tabPanel} dangerouslySetInnerHTML={{ __html: about?.text || '' }}></p>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}