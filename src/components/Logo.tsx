const Logo = () => {
  return (
    <div class="h-auto bg-terminal z-50  text-primary">
      <div class="xxs:hidden font-terminal text-5xl">BLOQUE FISHING</div>
      <pre class="hidden  xxs:block xxs:text-[clamp(0.35rem,1.2vw,1.5rem)] xs:text-[clamp(0.4rem,1.2vw,1.5rem)] sm:text-[clamp(0.5rem,1.2vw,.7rem)] lg:text-[clamp(0.32rem,1.2vw,.7rem)] leading-[1.1] sm:leading-[1.2]  whitespace-pre-wrap text-center tracking-tight">
        {`
██████╗ ██╗      ██████╗  ██████╗ ██╗   ██╗███████╗    ███████╗██╗███████╗██╗  ██╗██╗███╗   ██╗ ██████╗ 
██╔══██╗██║     ██╔═══██╗██╔═══██╗██║   ██║██╔════╝    ██╔════╝██║██╔════╝██║  ██║██║████╗  ██║██╔════╝ 
██████╔╝██║     ██║   ██║██║   ██║██║   ██║█████╗      █████╗  ██║███████╗███████║██║██╔██╗ ██║██║  ███╗
██╔══██╗██║     ██║   ██║██║▄▄ ██║██║   ██║██╔══╝      ██╔══╝  ██║╚════██║██╔══██║██║██║╚██╗██║██║   ██║
██████╔╝███████╗╚██████╔╝╚██████╔╝╚██████╔╝███████╗    ██║     ██║███████║██║  ██║██║██║ ╚████║╚██████╔╝
╚═════╝ ╚══════╝ ╚═════╝  ╚══▀▀═╝  ╚═════╝ ╚══════╝    ╚═╝     ╚═╝╚══════╝╚═╝  ╚═╝╚═╝╚═╝  ╚═══╝ ╚═════╝ 
          `}
      </pre>
    </div>
  )
}

export default Logo
