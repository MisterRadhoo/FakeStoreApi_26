export const fakeLikeBotMessages = {
    spammyAggressive: [
        {
            rating: 5,
            text: "BUY THIS NOW!!! Amazing product!!! Best deal ever!!! Totally worth it!!!"
        },
        {
            rating: 4.9,
            text: "MUST BUY!!! Excellent quality!!! You will love it!!! Order today!!!"
        },
        {
            rating: 4.8,
            text: "Amazing item!!! Perfect choice!!! Incredible value!!! Buy now!!!"
        },
        {
            rating: 5,
            text: "Best purchase ever!!! Outstanding product!!! Five stars!!! Must have!!!"
        },
        {
            rating: 4.9,
            text: "Do not miss this!!! Fantastic product!!! Extremely satisfied!!! Buy it!!!"
        },
        {
            rating: 4.8,
            text: "Top quality!!! Best experience ever!!! Highly recommended!!! Get it now!!!"
        },
        {
            rating: 5,
            text: "Absolutely amazing!!! Worth every cent!!! Best item online!!!"
        },
        {
            rating: 4.9,
            text: "Superb product!!! Excellent choice!!! You need this right now!!!"
        },
        {
            rating: 4.8,
            text: "Unbelievable quality!!! Amazing value!!! Best product on the market!!!"
        },
        {
            rating: 5,
            text: "Incredible item!!! Totally perfect!!! Buy today!!! You will not regret it!!!"
        }
    ],

    genericAmazonStyle: [
        {
            rating: 4.6,
            text: "Works well and feels like a solid purchase for the price. So far I have no major complaints."
        },
        {
            rating: 4.7,
            text: "The quality is better than I expected and it has been easy to use from the start."
        },
        {
            rating: 4.5,
            text: "Good overall product. It arrived as described and seems reliable for everyday use."
        },
        {
            rating: 4.8,
            text: "Very satisfied with this item. It feels well made and does exactly what I needed."
        },
        {
            rating: 4.4,
            text: "A decent buy overall. The product looks nice, works properly, and feels worth the money."
        },
        {
            rating: 4.7,
            text: "This has been a good purchase for me. Setup was simple and the performance has been consistent."
        },
        {
            rating: 4.5,
            text: "No issues so far. It seems durable, practical, and a fair value for the cost."
        },
        {
            rating: 4.6,
            text: "Pretty happy with this purchase. The item feels sturdy and has been working as expected."
        },
        {
            rating: 4.8,
            text: "Good quality for the price. I have used it several times already and it has held up well."
        },
        {
            rating: 4.4,
            text: "Overall I am pleased with it. It is simple, functional, and matches the listing well."
        }
    ],

    overPositiveNoDetails: [
        {
            rating: 4.8,
            text: "Very happy with this purchase. It turned out even better than I expected."
        },
        {
            rating: 4.9,
            text: "I am extremely satisfied with this item and would definitely buy it again."
        },
        {
            rating: 4.7,
            text: "This has been a great purchase for me. I am really pleased with how it turned out."
        },
        {
            rating: 4.8,
            text: "I honestly love this product. It has been a very positive experience overall."
        },
        {
            rating: 4.6,
            text: "Really impressed with this item. I am glad I decided to order it."
        },
        {
            rating: 4.9,
            text: "One of my better purchases recently. I am very satisfied with everything so far."
        },
        {
            rating: 4.7,
            text: "This product made a very good first impression and I am happy with my choice."
        },
        {
            rating: 4.8,
            text: "I have been enjoying this a lot. Overall it has been a very satisfying purchase."
        },
        {
            rating: 4.6,
            text: "Very pleased with the item and the overall experience. It met my expectations well."
        },
        {
            rating: 4.9,
            text: "Excellent purchase in my opinion. I am genuinely happy with how good it has been."
        }
    ],

    repetitiveTemplate: [
        {
            rating: 4.5,
            text: "Good quality, good fit, good value. Overall a good purchase."
        },
        {
            rating: 4.7,
            text: "Nice design, nice feel, nice performance. Overall a nice product."
        },
        {
            rating: 4.4,
            text: "Simple to use, simple to handle, simple to like. Overall a simple good buy."
        },
        {
            rating: 4.8,
            text: "Great quality, great appearance, great value. Overall a great choice."
        },
        {
            rating: 4.6,
            text: "Solid build, solid performance, solid price. Overall a solid purchase."
        },
        {
            rating: 4.5,
            text: "Looks good, works well, feels reliable. Overall a good experience."
        },
        {
            rating: 4.7,
            text: "Easy setup, easy use, easy maintenance. Overall easy to recommend."
        },
        {
            rating: 4.4,
            text: "Good packaging, good condition, good first impression. Overall a good item."
        },
        {
            rating: 4.8,
            text: "Very practical, very convenient, very satisfying. Overall very pleased."
        },
        {
            rating: 4.6,
            text: "Strong quality, strong performance, strong value. Overall a strong buy."
        }
    ]
};

export const allFakeLikeBotMessages = [
    ...fakeLikeBotMessages.spammyAggressive,
    ...fakeLikeBotMessages.genericAmazonStyle,
    ...fakeLikeBotMessages.overPositiveNoDetails,
    ...fakeLikeBotMessages.repetitiveTemplate
];