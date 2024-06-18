import s from './ProductDetailedView.module.scss'
import cx from "classnames"

export default function ProductDetailedView() {
    return (
        <div className={cx(s.layout)}>
            <div className={cx("d-flex align-items-center")}>
                <div className={cx("flex-grow-1")}>
                    <div className={cx(s.fs_12, s.fw_500)}>Donuts</div>
                    <div className={cx(s.fs_16, s.fw_600, s.fontMedium)}>Oreo Filled Donut</div>
                </div>
                <div>
                    <button className={cx(s.btn)}>Add</button>
                </div>
            </div>
            <div className={cx(s.imgContainer, s.mt_16)}>
                <img src="https://img.freepik.com/free-photo/nature-tranquil-beauty-reflected-calm-water-generative-ai_188544-12798.jpg?t=st=1716906325~exp=1716909925~hmac=3a034154c44aa6c93a55c6a0bcf12c2752fc9c76f01d780835657645d2e1f25e&w=1380" />
            </div>
            <div className={cx(s.fs_11, s.fw_400, s.mt_16, s.desc)} >
                Indulge in the ultimate sweet treat with our Oreo Filled Donut! This delectable delight features a fluffy, freshly fried donut filled with a creamy Oreo-infused filling, offering the perfect balance of chocolatey goodness and irresistible sweetness. Topped with a generous sprinkle of crushed Oreos for added crunch and flavor, each bite is a heavenly experience that'll leave you craving more. Treat yourself or share with friends and family – either way, it's guaranteed to satisfy your sweet tooth! Order now and elevate your dessert game to a whole new level.
            </div>
            <div className={cx(s.fs_11, s.fw_600)} style={{ textAlign: "right" }} > Read more</div>
            <div className={cx(s.mt_16)}>
                <div className={cx(s.fs_12, s.fw_500)}>Available Sizes</div>
                <div className={cx(s.fs_14, s.fw_500, s.fontMedium)}>300gms, 600gms</div>
            </div>
        </div >
    )
}
