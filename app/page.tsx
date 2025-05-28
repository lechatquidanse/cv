import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { CalendarDays, ExternalLink, Github, Globe, Mail, MapPin, Phone, Star, Users } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function CVPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/40 to-indigo-50/30 print:bg-white relative">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.02] print:hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgb(15 23 42) 1px, transparent 0)`,
            backgroundSize: "24px 24px",
          }}
        ></div>
      </div>

      <div className="max-w-5xl mx-auto p-6 print:p-4 print:max-w-none relative z-10">
        {/* Header */}
        <header className="text-center mb-6 print:mb-8">
         <div className="relative inline-block mb-6">
            <div className="w-36 h-36 rounded-full overflow-hidden shadow-lg print:shadow-none relative border-4 border-white">
              <Image
                src="./stephane-elmanouni.jpeg"
                alt="Stephane EL MANOUNI Profile Picture"
                width={144}
                height={144}
                className="w-full h-full object-cover"
                priority
              />
            </div>
            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-emerald-500 rounded-full border-4 border-white shadow-md print:hidden"></div>
          </div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-slate-800 via-blue-800 to-indigo-800 bg-clip-text text-transparent mb-3 print:text-black print:text-4xl">
            Stéphane EL MANOUNI
          </h1>
          <p className="text-xl text-slate-600 mb-6 print:text-xl">Cross-Stack Developer | 15+ Years Experience</p>

          <div className="flex flex-wrap justify-center gap-3 text-sm text-slate-600 print:text-xs print:gap-4">
            <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm border border-slate-200/50 print:bg-transparent print:shadow-none print:border-0">
              <Mail className="w-4 h-4 text-blue-600" />
              <span><a href="mailto:stephane.elmanouni@gmail.com">stephane.elmanouni@gmail.com</a></span>
            </div>
            <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm border border-slate-200/50 print:bg-transparent print:shadow-none print:border-0">
              <Phone className="w-4 h-4 text-emerald-600" />
              <span>+34 (0) 635160780</span>
            </div>
            <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm border border-slate-200/50 print:bg-transparent print:shadow-none print:border-0">
              <MapPin className="w-4 h-4 text-rose-600" />
              <span>Barcelona, Spain</span>
            </div>
            <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm border border-slate-200/50 print:bg-transparent print:shadow-none print:border-0">
              <Github className="w-4 h-4 text-slate-700" />
              <span><a href="https://github.com/lechatquidanse" target="_blank" rel="noopener noreferrer">github.com/lechatquidanse</a></span>
            </div>
            <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm border border-slate-200/50 print:bg-transparent print:shadow-none print:border-0">
              <Globe className="w-4 h-4 text-indigo-600" />
              <span><a href="https://www.linkedin.com/in/stephane-el-manouni/" target="_blank" rel="noopener noreferrer">linkedin/stephane-el-manouni</a></span>
            </div>
          </div>
        </header>

        {/* Summary */}
        <section className="mb-10 print:mb-8">
          <Card className="bg-gradient-to-r from-white/95 to-blue-50/60 backdrop-blur-sm border border-slate-200/50 shadow-lg print:shadow-none print:border print:bg-white">
            <CardContent>
              
              <p className="text-slate-700 leading-relaxed text-lg print:text-base">
                With over <strong className="text-blue-700 print:text-black">15 years</strong> in development, I focus on delivering <strong className="text-emerald-700 print:text-black">clean, robust</strong> and <strong className="text-emerald-700 print:text-black">customer-oriented code</strong>.
                <br/>I take time to understand the domain, clarify what's needed and write well-tested solutions.
                <br/>I follow <strong className="text-emerald-700 print:text-black">agile principles</strong>, solve real-world problems and use the right tech (<strong className="text-indigo-700 print:text-black">Symfony, React, Flutter, Python...</strong>) for each project.
                Always learning. Always improving.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Two-column layout for Professional Experience and Personal Projects */}
        <div className="grid gap-4 lg:grid-cols-2 print:grid-cols-2 mb-10 print:mb-6">
          {/* Left Column - Professional Experience */}
          <section>
            <h2 className="text-xl font-bold bg-gradient-to-r from-slate-800 to-blue-700 bg-clip-text text-transparent mb-6 print:text-black print:text-2xl">
              Professional Experience
            </h2>

            <div className="space-y-6 print:space-y-4">
              <Card className="bg-gradient-to-br from-white/95 to-blue-50/40 backdrop-blur-sm border border-slate-200/50 shadow-lg hover:shadow-xl transition-all duration-300 print:shadow-none print:border print:bg-white">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex items-start gap-3">
                      <div className="w-14 h-14 bg-gradient-to-br from-purple-300 to-purple-400 rounded-xl flex items-center justify-center shadow-md print:w-10 print:h-10">
                        <Image
                          src="./kooomo.png"
                          alt="Kooomo Logo"
                          width={32}
                          height={32}
                          className="rounded-lg print:w-6 print:h-6"
                        />
                      </div>
                      <div>
                        <CardTitle className="text-m print:text-lg text-slate-800">
                          Senior Full-Stack Developer
                        </CardTitle>
                        <CardDescription className="text-lg font-semibold text-blue-700 print:text-base">
                          <a href="http://kooomo.com" target="__blank">Kooomo</a>
                        </CardDescription>
                      </div>
                    </div>
                    <div className="m-[2px] text-right text-xs text-slate-500 bg-white/60 backdrop-blur-sm p-2 rounded-lg border border-slate-200/30 print:bg-transparent print:p-0 print:border-0">
                      <div className="flex items-center gap-1">
                        <CalendarDays className="w-3 h-3" />
                        <span>2024 - Present</span>
                      </div>
                      <div className="flex items-center gap-1 mt-1">
                        <MapPin className="w-3 h-3" />
                        <span>Barcelona, ES</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-slate-700 mb-4 text-sm">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>
                        Integrated <strong className="text-blue-700 print:text-black">third-party APIs</strong> such as Salesupply, Sendcloud, and Adyen for enhanced logistics and payment workflows.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>
                        Delivered invoice features with automated <strong className="text-emerald-700 print:text-black">PDF generation</strong> for 10k weekly users.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>
                        Applied <strong className="text-indigo-700 print:text-black">unit testing as a core practice</strong> to ensure reliability
                        (from 0% to 15% coverage).
                      </span>
                    </li>
                  </ul>
                  <div className="flex flex-wrap gap-1">
                    <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 border-blue-200 text-xs">Laravel</Badge>
                    <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200 border-emerald-200 text-xs">
                      Node.js
                    </Badge>
                    <Badge className="bg-indigo-100 text-indigo-800 hover:bg-indigo-200 border-indigo-200 text-xs">
                      MySQL
                    </Badge>
                    <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200 border-amber-200 text-xs">
                      AWS
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-white/95 to-indigo-50/40 backdrop-blur-sm border border-slate-200/50 shadow-lg hover:shadow-xl transition-all duration-300 print:shadow-none print:border print:bg-white">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex items-start gap-3">
                      <div className="w-14 h-14 bg-gradient-to-br from-pink-100 to-pink-200 rounded-xl flex items-center justify-center shadow-md print:w-10 print:h-10">
                        <Image
                          src="./zeelo_logo.jpeg"
                          alt="Zeelo Logo"
                          width={32}
                          height={32}
                          className="rounded-lg print:w-6 print:h-6"
                        />
                      </div>
                      <div>
                        <CardTitle className="text-m print:text-lg text-slate-800">Senior Back-End Developer</CardTitle>
                        <CardDescription className="text-lg font-semibold text-indigo-700 print:text-base">
                          <a href="https://zeelo.co/" target="_blank">Zeelo</a>
                        </CardDescription>
                      </div>
                    </div>
                    <div className="m-[2px] text-right text-xs text-slate-500 bg-white/60 backdrop-blur-sm p-2 rounded-lg border border-slate-200/30 print:bg-transparent print:p-0 print:border-0">
                      <div className="flex items-center gap-1">
                        <CalendarDays className="w-3 h-3" />
                        <span>2022 - 2023</span>
                      </div>
                      <div className="flex items-center gap-1 mt-1">
                        <MapPin className="w-3 h-3" />
                        <span>Barcelona, ES</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-slate-700 mb-4 text-sm">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>
                        Built a <strong className="text-indigo-700 print:text-black">"Buy Now, Pay Later"</strong> feature for an English school using Stripe, ensuring compliance with UK legal requirements.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>
                        Developed a <strong className="text-emerald-700 print:text-black">domain-driven, event-sourced application</strong> using Symfony to ensure high scalability and auditability.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>
                        Created <strong className="text-blue-700 print:text-black">Dockerized environment</strong>, enabling smooth transitions from development to production (AWS).
                      </span>
                    </li>
                  </ul>
                  <div className="flex flex-wrap gap-1">
                    <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200 border-yellow-200 text-xs">
                      Symfony
                    </Badge>
                    <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200 border-emerald-200 text-xs">
                      React
                    </Badge>
                    <Badge className="bg-rose-100 text-rose-800 hover:bg-rose-200 border-rose-200 text-xs">Redis</Badge>
                    <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200 border-amber-200 text-xs">
                      AWS
                    </Badge>
                  </div>
                </CardContent>
              </Card>
              

              <Card className="bg-gradient-to-br from-white/95 to-indigo-50/40 backdrop-blur-sm border border-slate-200/50 shadow-lg hover:shadow-xl transition-all duration-300 print:shadow-none print:border print:bg-white">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex items-start gap-3">
                      <div className="w-14 h-14 bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center shadow-md print:w-10 print:h-10">
                        <Image
                          src="./signaturit-group-logo.png"
                          alt="Signaturit Logo"
                          width={32}
                          height={32}
                          className="rounded-lg print:w-6 print:h-6"
                        />
                      </div>
                      <div>
                        <CardTitle className="text-m print:text-lg text-slate-800">Senior Back-End Developer</CardTitle>
                        <CardDescription className="text-lg font-semibold text-indigo-700 print:text-base">
                          <a href="https://www.signaturit.com/" target="_blank">Signaturit</a>
                        </CardDescription>
                      </div>
                    </div>
                    <div className="m-[2px] text-right text-xs text-slate-500 bg-white/60 backdrop-blur-sm p-2 rounded-lg border border-slate-200/30 print:bg-transparent print:p-0 print:border-0">
                      <div className="flex items-center gap-1">
                        <CalendarDays className="w-3 h-3" />
                        <span>2019 - 2022</span>
                      </div>
                      <div className="flex items-center gap-1 mt-1">
                        <MapPin className="w-3 h-3" />
                        <span>Barcelona, ES</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-slate-700 mb-4 text-sm">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>
                        Contributed to Signaturit's legally <strong className="text-indigo-700 print:text-black">compliant electronic signature</strong> platform, enabling secure online document signing.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>
                        Applied Domain-Driven Design (<strong className="text-emerald-700 print:text-black">DDD</strong>) and <strong className="text-emerald-700 print:text-black">CQRS</strong> to ensure maintainable and scalable architecture.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>
                        Developed and deployed features across a <strong className="text-blue-700 print:text-black">microservices stack</strong> using Symfony, NodeJS, Kotlin, Docker, Jenkins, and AWS.
                      </span>
                    </li>
                  </ul>
                  <div className="flex flex-wrap gap-1">
                    <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200 border-yellow-200 text-xs">
                      Symfony
                    </Badge>
                    <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200 border-emerald-200 text-xs">
                      Node.js
                    </Badge>
                    <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 border-blue-200 text-xs">Docker</Badge>
                    <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-200 border-orange-200 text-xs">
                      Kotlin
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              

              <Card className="bg-gradient-to-br from-white/95 to-indigo-50/40 backdrop-blur-sm border border-slate-200/50 shadow-lg hover:shadow-xl transition-all duration-300 print:shadow-none print:border print:bg-white">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex items-start gap-3">
                      <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-indigo-200 rounded-xl flex items-center justify-center shadow-md print:w-10 print:h-10">
                      </div>
                      <div>
                        <CardTitle className="text-m print:text-lg text-slate-800">Full Stack Developer</CardTitle>
                        <CardDescription className="text-lg font-semibold text-indigo-700 print:text-base">
                          WeTrack Barcelona
                        </CardDescription>
                      </div>
                    </div>
                    <div className="m-[2px] text-right text-xs text-slate-500 bg-white/60 backdrop-blur-sm p-2 rounded-lg border border-slate-200/30 print:bg-transparent print:p-0 print:border-0">
                      <div className="flex items-center gap-1">
                        <CalendarDays className="w-3 h-3" />
                        <span>2016 - 2018</span>
                      </div>
                      <div className="flex items-center gap-1 mt-1">
                        <MapPin className="w-3 h-3" />
                        <span>Barcelona, ES</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-slate-700 mb-4 text-sm">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>
                        Symfony API creation. Write specifications and develop documented services for external clients.
                      </span>
                    </li>
                  </ul>
                  <div className="flex flex-wrap gap-1">
                    <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200 border-yellow-200 text-xs">
                      Symfony
                    </Badge>
                    <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200 border-emerald-200 text-xs">
                      Node.js
                    </Badge>
                    <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 border-blue-200 text-xs">Docker</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-white/95 to-indigo-50/40 backdrop-blur-sm border border-slate-200/50 shadow-lg hover:shadow-xl transition-all duration-300 print:shadow-none print:border print:bg-white">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex items-start gap-3">
                      <div className="w-14 h-14 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl flex items-center justify-center shadow-md print:w-10 print:h-10">
                      </div>
                      <div>
                        <CardTitle className="text-m print:text-lg text-slate-800">Senior Back-End Developer</CardTitle>
                        <CardDescription className="text-lg font-semibold text-indigo-700 print:text-base">
                          IronWeb London
                        </CardDescription>
                      </div>
                    </div>
                    <div className="m-[2px] text-right text-xs text-slate-500 bg-white/60 backdrop-blur-sm p-2 rounded-lg border border-slate-200/30 print:bg-transparent print:p-0 print:border-0">
                      <div className="flex items-center gap-1">
                        <CalendarDays className="w-3 h-3" />
                        <span>2015 - 2016</span>
                      </div>
                      <div className="flex items-center gap-1 mt-1">
                        <MapPin className="w-3 h-3" />
                        <span>London, UK</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-slate-700 mb-4 text-sm">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>
                        Creation of different REST API (PHP, Symfony), maintain and consolidate projects.
                      </span>
                    </li>
                  </ul>
                  <div className="flex flex-wrap gap-1">
                    <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200 border-yellow-200 text-xs">
                      Symfony
                    </Badge>
                    <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 border-blue-200 text-xs">Docker</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-white/95 to-indigo-50/40 backdrop-blur-sm border border-slate-200/50 shadow-lg hover:shadow-xl transition-all duration-300 print:shadow-none print:border print:bg-white">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex items-start gap-3">
                      <div className="w-14 h-14 bg-gradient-to-br from-red-100 to-red-200 rounded-xl flex items-center justify-center shadow-md print:w-10 print:h-10">
                      </div>
                      <div>
                        <CardTitle className="text-m print:text-lg text-slate-800">PHP Development Engineer</CardTitle>
                        <CardDescription className="text-lg font-semibold text-indigo-700 print:text-base">
                          DigitasLBI Paris
                        </CardDescription>
                      </div>
                    </div>
                    <div className="m-[2px] text-right text-xs text-slate-500 bg-white/60 backdrop-blur-sm p-2 rounded-lg border border-slate-200/30 print:bg-transparent print:p-0 print:border-0">
                      <div className="flex items-center gap-1">
                        <CalendarDays className="w-3 h-3" />
                        <span>2011 - 2015</span>
                      </div>
                      <div className="flex items-center gap-1 mt-1">
                        <MapPin className="w-3 h-3" />
                        <span>Paris, FR</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-slate-700 mb-4 text-sm">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>
                        Development on Silex of a CMS for Renault Marketing Launches.
                      </span>
                    </li>
                  </ul>
                  <div className="flex flex-wrap gap-1">
                    <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200 border-yellow-200 text-xs">
                      Symfony
                    </Badge>
                    <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 border-blue-200 text-xs">Docker</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Right Column - Personal Projects */}
          <section>
            <h2 className="text-xl font-bold bg-gradient-to-r from-slate-800 to-indigo-700 bg-clip-text text-transparent mb-6 print:text-black print:text-2xl">
              Personal Projects
            </h2>

            <div className="space-y-6 print:space-y-4">
              <Card className="bg-gradient-to-br from-white/95 to-emerald-50/40 backdrop-blur-sm border border-slate-200/50 shadow-lg hover:shadow-xl transition-all duration-300 print:shadow-none print:border print:bg-white">
                
                  <CardHeader className="pb-3">
                    <div className="flex items-start gap-3">
                      <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center shadow-md print:w-10 print:h-10">
                        <Image
                          src="./foot_master_quiz.webp"
                          alt="Foot Master Quiz"
                          width={52}
                          height={52}
                          className="rounded-lg print:w-6 print:h-6"
                        />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-xl print:text-lg flex items-center gap-2 text-slate-800">
                          Foot Master Quiz
                          <Link href="https://footballerquiz1.web.app/" className="text-slate-400 hover:text-slate-600 transition-colors">
                            <ExternalLink className="w-4 h-4" />
                          </Link>
                        </CardTitle>
                        <CardDescription className="text-emerald-700 font-medium">
                          Mobile Application (iOS & Android)
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-slate-700 leading-relaxed text-sm">
                    Designed a football quiz application with
                    <strong className="text-emerald-700 print:text-black"> functional programming</strong>,
                    <strong className="text-blue-700 print:text-black"> API testing</strong>, and{" "}
                    <strong className="text-indigo-700 print:text-black">performance monitoring</strong> features.
                  </p>

                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/60 border border-emerald-200/50 p-2 rounded-lg print:bg-gray-50">
                      <div className="flex items-center justify-center gap-1 text-emerald-700">
                        <Star className="w-4 h-4" />
                        <span className="font-bold text-sm">210k</span>
                      </div>
                      <div className="text-xs text-slate-600">installations</div>
                    </div>
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100/60 border border-blue-200/50 p-2 rounded-lg print:bg-gray-50">
                      <div className="flex items-center justify-center gap-1 text-blue-700">
                        <Users className="w-4 h-4" />
                        <span className="font-bold text-sm">5k</span>
                      </div>
                      <div className="text-xs text-slate-600">Monthly Users</div>
                    </div>
                    <div className="bg-gradient-to-br from-indigo-50 to-indigo-100/60 border border-indigo-200/50 p-2 rounded-lg print:bg-gray-50">
                      <div className="text-indigo-700 font-bold text-sm">4.8/5</div>
                      <div className="text-xs text-slate-600">User Rating</div>
                    </div>
                  </div>

                  <div className="space-y-3 print:hidden">
                    <div className="relative group">
                      <div className="rounded-lg shadow-sm aspect-w-16 aspect-h-9">
                        <iframe
                          src={`https://www.youtube.com/embed/tOgwgHV1tzk?si=c8ocJAFbi6EF2Izr`}
                          title="YouTube video"
                          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="w-full h-full"
                        ></iframe>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    <Badge className="bg-cyan-100 text-cyan-800 hover:bg-cyan-200 border-cyan-200 text-xs">Flutter</Badge>
                    <Badge className="bg-violet-100 text-violet-800 hover:bg-violet-200 border-violet-200 text-xs">
                      iOS
                    </Badge>
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-200 border-green-200 text-xs">
                      Android
                    </Badge>
                    <Badge className="bg-red-100 text-red-800 hover:bg-red-200 border-red-200 text-xs">
                      Firebase
                    </Badge>
                    <Badge className="bg-blue-100 text-green-800 hover:bg-green-200 border-green-200 text-xs">
                      GoogleAd
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-white/95 to-emerald-50/40 backdrop-blur-sm border border-slate-200/50 shadow-lg hover:shadow-xl transition-all duration-300 print:shadow-none print:border print:bg-white">
                
                  <CardHeader className="pb-3">
                    <div className="flex items-start gap-3">
                      <div className="w-14 h-14 bg-gradient-to-br from-white-100 to-grey-100 rounded-xl flex items-center justify-center shadow-md print:w-10 print:h-10">
                        <Image
                          src="./bicing-logo.png"
                          alt="Bicin Logo API"
                          width={52}
                          height={52}
                          className="rounded-lg print:w-6 print:h-6"
                        />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-xl print:text-lg flex items-center gap-2 text-slate-800">
                          Bicing Api
                          <Link href="https://github.com/lechatquidanse/bicing-api" className="text-slate-400 hover:text-slate-600 transition-colors">
                            <ExternalLink className="w-4 h-4" />
                          </Link>
                        </CardTitle>
                        <CardDescription className="text-emerald-700 font-medium">
                          Open source project
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-slate-700 leading-relaxed text-sm">
                    Symfony 4 REST API applying
                    <strong className="text-emerald-700 print:text-black"> CQRS and DDD</strong>, built with 
                    <strong className="text-blue-700 print:text-black"> CI</strong>, driven by
                    <strong className="text-indigo-700 print:text-black"> BDD</strong>.
                  </p>

                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/60 border border-emerald-200/50 p-2 rounded-lg print:bg-gray-50">
                      <div className="flex items-center justify-center gap-1 text-emerald-700">
                        <Star className="w-4 h-4" />
                        <span className="font-bold text-sm">161</span>
                      </div>
                      <div className="text-xs text-slate-600">Github stars</div>
                    </div>
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100/60 border border-blue-200/50 p-2 rounded-lg print:bg-gray-50">
                      <div className="flex items-center justify-center gap-1 text-blue-700">
                        <Users className="w-4 h-4" />
                        <span className="font-bold text-sm">16</span>
                      </div>
                      <div className="text-xs text-slate-600">fork</div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200 border-yellow-200 text-xs">Symfony</Badge>
                    <Badge className="bg-red-100 text-red-800 hover:bg-red-200 border-red-200 text-xs">
                      CI
                    </Badge>
                    <Badge className="bg-blue-100 text-green-800 hover:bg-green-200 border-green-200 text-xs">
                      BDD
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-white/95 to-amber-50/40 backdrop-blur-sm border border-slate-200/50 shadow-lg hover:shadow-xl transition-all duration-300 print:shadow-none print:border print:bg-white">
                <CardHeader className="pb-3">
                  <div className="flex items-start gap-3">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-blue-300 rounded-xl flex items-center justify-center shadow-md print:w-10 print:h-10">
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-xl print:text-lg flex items-center gap-2 text-slate-800">
                        My CV
                        <Link href="./" className="text-slate-400 hover:text-slate-600 transition-colors">
                          <ExternalLink className="w-4 h-4" />
                        </Link>
                      </CardTitle>
                      <CardDescription className="text-amber-700 font-medium">
                        Website to display this CV
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-slate-700 leading-relaxed text-sm">
                    5 hours project to create a CV using AI tools and Github pages
                    <strong className="text-cyan-700 print:text-black"> AI tools</strong> and{" "}
                    <strong className="text-blue-700 print:text-black">GitHubPages</strong>.
                  </p>

                  <div className="flex flex-wrap gap-1">
                    <Badge className="bg-black-100 text-black-800 hover:bg-black-200 border-black-200 text-xs">
                      v0
                    </Badge>
                    <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 border-blue-200 text-sm py-1">
                      NextJs
                    </Badge>
                    <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 border-blue-200 text-xs">
                      Github Pages
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-white/95 to-amber-50/40 backdrop-blur-sm border border-slate-200/50 shadow-lg hover:shadow-xl transition-all duration-300 print:shadow-none print:border print:bg-white">
                <CardHeader className="pb-3">
                  <div className="flex items-start gap-3">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-800 to-blue-900 rounded-xl flex items-center justify-center shadow-md print:w-10 print:h-10">
                      <Image
                        src="./ladeux_cinq_logo.png"
                        alt="Deux Cinq logo"
                        width={48}
                        height={48}
                        className="rounded-lg print:w-6 print:h-6"
                      />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-xl print:text-lg flex items-center gap-2 text-slate-800">
                        Deux Cinq
                        <Link href="https://ladeuxcinq.com/" className="text-slate-400 hover:text-slate-600 transition-colors">
                          <ExternalLink className="w-4 h-4" />
                        </Link>
                      </CardTitle>
                      <CardDescription className="text-amber-700 font-medium">
                        Beer brand ecommerce 
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-slate-700 leading-relaxed text-sm">
                    Developed an Ecommerce for a French beer brand. Using
                    <strong className="text-green-700 print:text-black"> Shopify</strong> template creation and{" "}
                    <strong className="text-blue-700 print:text-black">GTM tracking</strong> to boost sales.
                  </p>

                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/60 border border-emerald-200/50 p-2 rounded-lg print:bg-gray-50">
                      <div className="text-emerald-700 font-bold text-sm">1k</div>
                      <div className="text-xs text-slate-600">monthly users</div>
                    </div>
                  </div>

                  <div className="space-y-3 print:hidden">
                      <Image
                        src="./la_deux_cinq.png"
                        alt="La deux cinq Screenshot 1"
                        width={160}
                        height={120}
                        className="rounded-lg shadow-sm group-hover:shadow-md transition-shadow w-full border border-slate-200/50"
                      />
                  </div>

                  <div className="flex flex-wrap gap-1">
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-200 border-green-200 text-xs">
                      Shopify
                    </Badge>
                    <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 border-blue-200 text-xs">
                      GTM
                    </Badge>
                  </div>
                </CardContent>
              </Card>


            </div>
          </section>
        </div>

        {/* Skills */}
        <section className="mb-12 print:mb-8">
          <h2 className="text-xl font-bold bg-gradient-to-r from-slate-800 to-emerald-700 bg-clip-text text-transparent mb-8 print:text-black print:text-2xl">
            Technical Skills
          </h2>

          <Card className="bg-gradient-to-br from-white/95 to-slate-50/60 backdrop-blur-sm border border-slate-200/50 shadow-lg print:shadow-none print:border print:bg-white">
            <CardContent className="pt-8">
              <div className="grid gap-8 md:grid-cols-2 print:grid-cols-2 print:gap-6">
                <div className="space-y-4">
                  <h3 className="font-bold text-xl text-slate-800 flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    Frontend
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 border-blue-200 text-sm py-1">
                      React
                    </Badge>
                    <Badge className="bg-slate-100 text-slate-800 hover:bg-slate-200 border-slate-200 text-sm py-1">
                      Next.js
                    </Badge>
                    <Badge className="bg-indigo-100 text-indigo-800 hover:bg-indigo-200 border-indigo-200 text-sm py-1">
                      TypeScript
                    </Badge>
                    <Badge className="bg-cyan-100 text-cyan-800 hover:bg-cyan-200 border-cyan-200 text-sm py-1">
                      Tailwind CSS
                    </Badge>
                    <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200 border-emerald-200 text-sm py-1">
                      Vue.js
                    </Badge>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-bold text-xl text-slate-800 flex items-center gap-3">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    Backend
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    <Badge className="bg-slate-100 text-slate-800 hover:bg-slate-200 border-slate-200 text-sm py-1">
                      PHP
                    </Badge>
                    <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200 border-yellow-200 text-sm py-1">
                      Symfony
                    </Badge>
                    <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-200 border-orange-200 text-sm py-1">
                      Laravel
                    </Badge>
                    <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200 border-emerald-200 text-sm py-1">
                      Node.js
                    </Badge>
                    <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200 border-yellow-200 text-sm py-1">
                      Python
                    </Badge>
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-200 border-green-200 text-sm py-1">
                      Django
                    </Badge>
                    <Badge className="bg-pink-100 text-pink-800 hover:bg-pink-200 border-pink-200 text-sm py-1">
                      GraphQL
                    </Badge>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-bold text-xl text-slate-800 flex items-center gap-3">
                    <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                    Database & Cloud
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 border-blue-200 text-sm py-1">
                      PostgreSQL
                    </Badge>
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-200 border-green-200 text-sm py-1">
                      MongoDB
                    </Badge>
                    <Badge className="bg-rose-100 text-rose-800 hover:bg-rose-200 border-rose-200 text-sm py-1">
                      Redis
                    </Badge>
                    <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200 border-amber-200 text-sm py-1">
                      AWS
                    </Badge>
                    <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 border-blue-200 text-sm py-1">
                      Docker
                    </Badge>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-bold text-xl text-slate-800 flex items-center gap-3">
                    <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                    Mobile & Tools
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 border-blue-200 text-sm py-1">
                      Flutter
                    </Badge>
                    <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 border-blue-200 text-sm py-1">
                      React Native
                    </Badge>
                    <Badge className="bg-slate-100 text-slate-800 hover:bg-slate-200 border-slate-200 text-sm py-1">
                      Git
                    </Badge>
                    <Badge className="bg-red-100 text-red-800 hover:bg-red-200 border-red-200 text-sm py-1">Jest</Badge>
                    <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 border-blue-200 text-sm py-1">
                      Kubernetes
                    </Badge>
                    <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200 border-emerald-200 text-sm py-1">
                      CI/CD
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Education */}
        <section className="mb-12 print:mb-6">
          <h2 className="text-xl font-bold bg-gradient-to-r from-slate-800 to-blue-700 bg-clip-text text-transparent mb-8 print:text-black print:text-2xl">
            Education
          </h2>

          <Card className="bg-gradient-to-br from-white/95 to-blue-50/40 backdrop-blur-sm border border-slate-200/50 shadow-lg print:shadow-none print:border print:bg-white">
            <CardContent className="pt-8">
              <div className="flex justify-between items-start gap-6">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center shadow-md print:w-12 print:h-12">
                    <Image
                      src="./polytech.jpg"
                      alt="Polytech Logo"
                      width={48}
                      height={48}
                      className="rounded-lg print:w-8 print:h-8"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-slate-800 print:text-lg">
                      Master of Computer Science
                    </h3>
                    <p className="text-blue-700 font-semibold text-lg print:text-base">
                      Polytech'Paris UPMC
                    </p>
                    <p className="text-slate-600 mt-2">
                      Relevant Coursework: Data Structures, Algorithms, Software Engineering, Database Systems
                    </p>
                  </div>
                </div>
                <div className="text-right text-sm text-slate-500 bg-white/60 backdrop-blur-sm p-3 rounded-lg border border-slate-200/30 print:bg-transparent print:p-0 print:border-0">
                  <div className="font-medium text-s print:text-base">2016 - 2020</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Footer */}
        <footer className="text-center text-sm text-slate-500 print:text-xs">
          <Separator className="mb-6" />
          <div className="bg-white/60 backdrop-blur-sm border border-slate-200/50 p-6 rounded-xl print:bg-transparent print:p-0 print:border-0">
            <p className="font-medium">
              This CV is available online at: <span className="text-blue-700 print:text-black">lechatquidanse.github.io/cv</span>
            </p>
            <p className="mt-2">Last updated: {new Date().toLocaleDateString()}</p>
          </div>
        </footer>
      </div>
    </div>
  )
}
