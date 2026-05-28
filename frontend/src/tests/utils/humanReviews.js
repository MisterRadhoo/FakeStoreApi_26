export const humanLikeReviewMessages = {
    detailedPositive: [
        {
            rating: 4.8,
            text: "I have been using this product for about two weeks and it works well so far. The material feels solid, the size is accurate, and the delivery arrived on time."
        },
        {
            rating: 4.6,
            text: "The product matched the online description and the colour looked very close to the photos. Packaging was clean and the item arrived without any damage."
        },
        {
            rating: 4.7,
            text: "I bought this for daily use and it has been comfortable so far. The quality feels good for the price and I did not notice any major issue."
        },
        {
            rating: 4.5,
            text: "The item arrived earlier than expected and was easy to use. It feels reliable, although the packaging could have been a little better."
        },
        {
            rating: 4.9,
            text: "I was not sure about the size at first, but it fits well and looks exactly like the product images. Overall, I am happy with the purchase."
        },
        {
            rating: 4.6,
            text: "I ordered this after comparing a few similar products and it turned out to be a good choice. The finish looks clean and it has worked well so far."
        },
        {
            rating: 4.7,
            text: "The product arrived in good condition and matched the size information from the listing. I have used it several times and it feels comfortable."
        },
        {
            rating: 4.5,
            text: "I liked that the product looked the same as in the photos. The material feels decent and the delivery was faster than I expected."
        },
        {
            rating: 4.8,
            text: "This has been reliable during the first week of use. The colour, size, and general quality are close to what I expected from the description."
        },
        {
            rating: 4.6,
            text: "The item feels sturdy and the packaging was handled properly. I bought it for everyday use and it has been practical so far."
        },
        {
            rating: 4.7,
            text: "I was pleased with the overall quality. The product does not feel cheap, the stitching looks clean, and the size was accurate for me."
        },
        {
            rating: 4.5,
            text: "The product works as expected and did not have any visible defects when it arrived. I also liked that the delivery updates were clear."
        }
    ],

    balancedReviews: [
        {
            rating: 3.8,
            text: "The product is good overall, but the delivery took longer than expected. The item itself works fine and the quality seems fair for the price."
        },
        {
            rating: 4.0,
            text: "I like the design and the product feels comfortable, but the box arrived slightly damaged. Luckily, the item inside was in good condition."
        },
        {
            rating: 3.7,
            text: "The quality is decent, but I expected the material to feel a bit more premium. It still works as intended and I will keep it."
        },
        {
            rating: 4.1,
            text: "The product looks nice and matches the listing, but customer support answered a bit slowly when I asked about the shipment."
        },
        {
            rating: 3.9,
            text: "It is a useful product and I have no major complaints. The only downside is that the size runs slightly smaller than I expected."
        },
        {
            rating: 3.8,
            text: "The item is fine for normal use, but the packaging could have been better. There were no major problems with the product itself."
        },
        {
            rating: 4.0,
            text: "The product feels comfortable and looks good, but the delivery estimate was not very accurate. I still think it was worth keeping."
        },
        {
            rating: 3.6,
            text: "The material is acceptable for the price, although it is not as soft as I expected. The product is usable and matches most of the description."
        },
        {
            rating: 4.2,
            text: "The product arrived on time and works well, but the colour is slightly different from the photos. It is not a big issue for me."
        },
        {
            rating: 3.9,
            text: "I am mostly satisfied with the product. The quality is good, but the size guide could be more accurate."
        },
        {
            rating: 3.7,
            text: "The product does the job, but I noticed a small difference between the photos and the actual finish. It is still useful."
        },
        {
            rating: 4.0,
            text: "I had a good experience overall. The item arrived safely, but the delivery took two extra days compared with the estimate."
        }
    ],

    negativeReal: [
        {
            rating: 2.2,
            text: "The product arrived with a small defect on the side. I contacted support and they answered, but the replacement process took several days."
        },
        {
            rating: 2.5,
            text: "The item does not look as good as in the photos. It is usable, but the material feels cheaper than I expected."
        },
        {
            rating: 2.8,
            text: "Delivery was late and the package was not handled very carefully. The product still works, but the overall experience was disappointing."
        },
        {
            rating: 2.0,
            text: "I ordered the correct size, but the product feels tighter than expected. I will probably return it and choose a different model."
        },
        {
            rating: 2.6,
            text: "The product is not terrible, but it did not meet my expectations. The finish looks different from the pictures and the quality feels average."
        },
        {
            rating: 2.4,
            text: "The item arrived later than expected and the box was slightly damaged. The product was still usable, but the experience was not great."
        },
        {
            rating: 2.3,
            text: "The product looked better online than it does in person. It works, but the material feels thin and not very durable."
        },
        {
            rating: 2.7,
            text: "I had to contact support because the tracking information was not updated. The product eventually arrived, but the process was frustrating."
        },
        {
            rating: 2.1,
            text: "The size was not accurate for me, even though I checked the guide before ordering. I will return it because it is not comfortable."
        },
        {
            rating: 2.5,
            text: "The product has a small mark on the surface and the packaging was not sealed properly. It is usable, but I expected better quality."
        },
        {
            rating: 2.8,
            text: "The item works, but it feels less stable than I expected. For the price, I thought the build quality would be better."
        },
        {
            rating: 2.2,
            text: "The colour was noticeably different from the listing photos. I can still use it, but I would not order the same version again."
        }
    ]
};

export const allHumanLikeReviewMessages = [
    ...humanLikeReviewMessages.detailedPositive,
    ...humanLikeReviewMessages.balancedReviews,
    ...humanLikeReviewMessages.negativeReal
];