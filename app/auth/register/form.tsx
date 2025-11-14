import Link from "next/link";

export default function Form() {
    return (
        <div
            className=
            "flex flex-col gap-8 justify-center items-center min-h-screen px-4 duration-400 delay-75 transition-all">
            <div
                className=
                "flex flex-col justify-start w-full max-w-sm bg-bg-cart-auth p-6 rounded-xl gap-4 shadow-xl shadow-text-legend-input/30">
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
                        ثبت نام
                    </p>
                    <div
                        className=
                        "flex flex-col gap-3">
                        <span
                            className=
                            "text-xs text-text-legend-input font-font-lahze-medium">
                            نام :
                        </span>
                        <input
                            type="text"
                            className=
                            "w-full p-2 bg-bg-background rounded-xl text-text-main font-font-lahze-medium text-xs border-2 border-text-legend-input"
                        />
                    </div>
                    <div
                        className=
                        "flex flex-col gap-3">
                        <span
                            className=
                            "text-xs text-text-legend-input font-font-lahze-medium">
                            نام خانوادگی :
                        </span>
                        <input
                            type="text"
                            className=
                            "w-full p-2 bg-bg-background rounded-xl text-text-main font-font-lahze-medium text-xs border-2 border-text-legend-input"
                        />
                    </div>
                    <div
                        className=
                        "flex flex-col gap-3">
                        <span
                            className=
                            "text-xs text-text-legend-input font-font-lahze-medium">
                            شماره تلفن همراه :
                        </span>
                        <input
                            type="text"
                            className=
                            "w-full p-2 bg-bg-background rounded-xl text-text-main font-font-lahze-medium text-xs border-2 border-text-legend-input"
                        />
                    </div>
                    <div
                        className=
                        "flex flex-col gap-3">
                        <span
                            className=
                            "flex text-xs text-text-legend-input font-font-lahze-medium gap-1">
                            ایمیل
                            <span
                                className=
                                "text-[10px] text-limit-auth">
                                (اختیاری)
                            </span>
                            :
                        </span>
                        <input
                            type="email"
                            className=
                            "w-full p-2 bg-bg-background rounded-xl text-text-main font-font-lahze-medium text-xs border-2 border-text-legend-input"
                        />
                    </div>
                    <Link
                        href="/auth/verificationCode">
                        <button
                            className=
                            "w-full p-2 bg-orginal-color-support rounded-xl text-bg-background font-font-lahze-medium text-sm cursor-pointer duration-400 delay-75 transition-all hover:bg-orginal-color hover:text-white hover:shadow-md hover:shadow-orginal-color/75 hover:scale-105">
                            ادامه
                        </button>
                    </Link>
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
                            و
                            را می‌پذیرم
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
                "flex text-xs h-5 text-bg-forground font-font-market-regular cursor-pointer duration-400 delay-75 transition-all hover:text-sm hover:text-orginal-color">
                تیم توسعه به نگارداده رسام
            </p>
        </div>
    );
}
