import { Outlet, NavLink } from "react-router";
import cn from "classnames";

const Page = () => {
  const cc = "mx-auto container max-w-5xl px-4";
  return (
    <>
    <header className="">
      <div className={ cn(cc, "flex flex-col items-center pt-2 mb-6") }>
        <NavLink to="/"><img src="/logo.png" alt="Логотип" className="max-w-[8ch]"/></NavLink>
        <nav className="flex flex-row flex-wrap space-x-2 py-4">
          <NavLink to="/">Главная</NavLink>
          <NavLink to="/products">Меню</NavLink>
          <NavLink to="/order">Бронирование</NavLink>
          <NavLink to="/events">Мероприятия</NavLink>
          <NavLink to="/contacts">Контакты</NavLink>
        </nav>
      </div>
    </header>
    <main className={ cc }>
      <Outlet />
    </main>
    <footer className={ cn("bg-[#333] text-white p-4") }>
      <div className=" text-center ">
        <p>г. Калуга, ул. Автозаводская, 15</p>
        <p>8-956-123-00-05</p>
        <p>email: KofeiKnigi@mail.ru</p>
        <div className="space-x-2">      
        <span>Соцсети:</span><a href="https://vk.com">ВК</a><a href="https://ok.com">ОК</a>
        </div>
      </div>
    </footer>
    </>
  )
}

export default Page;