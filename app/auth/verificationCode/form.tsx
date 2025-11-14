

export default function Form() {
    return (
        <div
            className=
            "flex flex-col gap-8 justify-center items-center min-h-screen px-4">
            <div
                className=
                "flex flex-col justify-start w-full max-w-sm bg-bg-cart-auth p-6 rounded-xl gap-6 shadow-xl shadow-text-legend-input/30">
                <p
                    className=
                    "text-orginal-color w-full tracking-wide text-4xl text-center font-font-market-regular px-4 sm:px-16">
                    bdrshop
                </p>
                <div
                    className=
                    "flex flex-col gap-6">
                    <p
                        className=
                        "text-lg text-text-main font-font-lahze-medium">
                        کد تایید
                    </p>
                    <div
                        className=
                        "flex flex-col gap-3">
                        <span
                            className=
                            "text-xs text-text-legend-input font-font-lahze-medium">
                            لطفا کد تایید ارسال شده خود را وارد نمایید.
                        </span>
                        <div
                            className=
                            "flex justify-between gap-3 mt-2">
                            {[...Array(5)].map((_, i) => (
                                <input
                                    key={i}
                                    type="text"
                                    maxLength={1}
                                    className=
                                    "w-10 h-10 text-center text-lg font-font-lahze-medium text-text-main border-2 border-text-legend-input rounded-xl bg-bg-background focus:outline-none focus:border-orginal-color transition-all duration-300"
                                />
                            ))}
                        </div>
                    </div>
                    <button
                        className=
                        "w-full p-2 bg-orginal-color-support rounded-xl text-bg-background font-font-lahze-medium text-sm cursor-pointer transition-all hover:bg-orginal-color hover:text-white hover:shadow-md hover:shadow-orginal-color/75 hover:scale-105">
                        ادامه
                    </button>
                    <div
                        className=
                        "flex flex-col justify-center items-center text-center gap-1">
                        <p
                            className=
                            "flex flex-row text-text-main text-[10px] font-font-lahze-light gap-1">
                            با ورود به بی دی آر شاپ،
                            <span
                                className=
                                "text-orginal-color-support">
                                شرایط بی دی آر شاپ
                            </span>
                            و را می‌پذیرم
                        </p>
                        <p
                            className=
                            "flex flex-row text-text-main text-[10px] font-font-lahze-light gap-1">
                            <span
                                className=
                                "text-orginal-color-support">
                                قوانین حریم خصوصی
                            </span>
                            را می‌پذیرم
                        </p>
                    </div>
                </div>
            </div>
            <p
                className=
                "flex text-xs h-5 text-bg-forground font-font-market-regular cursor-pointer transition-all hover:text-sm hover:text-orginal-color">
                تیم توسعه به نگارداده رسام
            </p>
        </div>
    );
}
