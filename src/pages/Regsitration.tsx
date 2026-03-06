
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";

type FormValues = {
  registrationId: string;
  date: string;
  registrationChannels: string[];
  fullName: string;
  dob: string;
  gender: string;
  phone: string;
  email: string;
  address: string;
  lga: string;
  ward: string;
  pollingUnitName: string;
  pollingUnitCode: string;
  qualification: string;
  fieldOfStudy: string;
  employmentStatus: string;
  vocationalTrade: string;
  creativeSkills: string[];
  sportsInterests: string[];
  leadershipInterests: string[];
  digitalPlatforms: string[];
  declaration: boolean;
  signature: string;
};

const REGISTRATION_CHANNELS = ["Website", "Mobile", "Field", "Campus", "Market", "Religious Centre"];
const GENDERS = ["Male", "Female", "Other"];
const QUALIFICATIONS = ["SSCE", "ND", "HND", "BSc", "MSc", "PhD"];
const EMPLOYMENT_STATUS = ["Employed", "Self-employed", "Student", "Unemployed"];
const CREATIVE_SKILLS = ["Music/Performing Arts", "Photography/Videography", "Writing/Content Creation", "Graphic Design", "Fashion Design/Tailoring", "Visual Arts", "Other"];
const SPORTS_INTERESTS = ["Football", "Basketball", "Athletics", "Volleyball", "Other"];
const LEADERSHIP_INTERESTS = ["Youth Empowerment", "Civic Education", "Community Service", "Political Organizing"];
const DIGITAL_PLATFORMS = ["WhatsApp", "Facebook", "Twitter/X", "TikTok", "Instagram"];

const CompleteProfile = () => {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, control } = useForm<FormValues>({
    defaultValues: {
      registrationId: "PCM-CZ-2023-8942",
      registrationChannels: [],
      creativeSkills: [],
      sportsInterests: [],
      leadershipInterests: [],
      digitalPlatforms: [],
      declaration: false,
    },
  });

  const onSubmit = async (data: FormValues) => {
    if (!data.declaration) {
      alert("Please accept the declaration before submitting.");
      return;
    }

    setLoading(true);

    const user = await supabase.auth.getUser();
    const userId = user.data?.user?.id;

    if (!userId) {
      alert("User not authenticated.");
      setLoading(false);
      return;
    }

    const { error } = await supabase.from("registrations").insert([
      {
        registration_id: data.registrationId,
        date: data.date,
        registration_channels: data.registrationChannels,
        full_name: data.fullName,
        dob: data.dob,
        gender: data.gender,
        phone: data.phone,
        email: data.email,
        address: data.address,
        lga: data.lga,
        ward: data.ward,
        polling_unit_name: data.pollingUnitName,
        polling_unit_code: data.pollingUnitCode,
        qualification: data.qualification,
        field_of_study: data.fieldOfStudy,
        employment_status: data.employmentStatus,
        vocational_trade: data.vocationalTrade,
        creative_skills: data.creativeSkills,
        sports_interests: data.sportsInterests,
        leadership_interests: data.leadershipInterests,
        digital_platforms: data.digitalPlatforms,
        declaration: data.declaration,
        signature: data.signature,
        user_id: userId,
      },
    ]);

    if (error) {
      alert(error.message);
    } else {
      alert("Registration successful!");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background text-white">
      <Navbar />
      <div className="pt-24 pb-16 px-4 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-xl shadow-xl p-8"
        >
          <h1 className="text-2xl font-bold text-foreground mb-2">
            CENTRAL ZONE PILOT ELECTRONIC REGISTRATION FORM
          </h1>
          <p className="text-muted-foreground mb-6">
            Please fill in your details accurately to complete your registration with The Consensus.
          </p>

          <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>

            {/* Registration Details */}
            <section>
              <h2 className="font-semibold text-lg mb-4 flex items-center gap-2 text-foreground">
                <span>📄</span> Registration Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label className="mb-1 text-sm font-medium text-foreground">Registration ID</label>
                  <Input {...register("registrationId")} className="bg-white text-black" readOnly />
                </div>
                <div className="flex flex-col">
                  <label className="mb-1 text-sm font-medium text-foreground">Date</label>
                  <Input type="date" {...register("date")} className="bg-white text-black" />
                </div>
              </div>
              <div className="mt-4">
                <label className="font-medium mb-2 block text-foreground">Registration Channel</label>
                <div className="flex flex-wrap gap-3">
                  {REGISTRATION_CHANNELS.map(channel => (
                    <label key={channel} className="flex items-center space-x-2">
                      <input type="checkbox" {...register("registrationChannels")} value={channel} className="accent-primary" />
                      <span className="text-foreground">{channel}</span>
                    </label>
                  ))}
                </div>
              </div>
            </section>

            {/* Personal Information */}
            <section>
              <h2 className="font-semibold text-lg mb-4 flex items-center gap-2 text-foreground">
                <span>👤</span> Personal Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label className="mb-1 text-sm font-medium text-foreground">Full Name</label>
                  <Input placeholder="Surname First Name Middle Name" {...register("fullName")} className="bg-white text-black" />
                </div>
                <div className="flex flex-col">
                  <label className="mb-1 text-sm font-medium text-foreground">Date of Birth</label>
                  <Input type="date" {...register("dob")} className="bg-white text-black" />
                </div>

                <div className="flex flex-col">
                  <label className="mb-1 text-sm font-medium text-foreground">Gender</label>
                  <Controller
                    control={control}
                    name="gender"
                    render={({ field }) => (
                      <Select onValueChange={field.onChange}>
                        <SelectTrigger className="bg-white text-black w-full">
                          <SelectValue placeholder="Select Gender" />
                        </SelectTrigger>
                        <SelectContent>
                          {GENDERS.map(g => <SelectItem key={g} value={g}>{g}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>

                <div className="flex flex-col">
                  <label className="mb-1 text-sm font-medium text-foreground">Phone Number (WhatsApp)</label>
                  <Input placeholder="080..." {...register("phone")} className="bg-white text-black" />
                </div>

                <div className="flex flex-col">
                  <label className="mb-1 text-sm font-medium text-foreground">Email Address</label>
                  <Input type="email" placeholder="example@email.com" {...register("email")} className="bg-white text-black" />
                </div>

                <div className="flex flex-col md:col-span-2">
                  <label className="mb-1 text-sm font-medium text-foreground">Residential Address</label>
                  <Textarea placeholder="Enter full address" {...register("address")} className="bg-white text-black" />
                </div>
              </div>
            </section>

            {/* Location & Polling Unit */}
            <section className="bg-card p-4 rounded-lg">
              <h2 className="font-semibold text-lg mb-4 flex items-center gap-2 text-foreground">
                <span>📍</span> Location & Polling Unit
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label className="mb-1 text-sm font-medium text-foreground">Local Govt Area (LGA)</label>
                  <Controller
                    control={control}
                    name="lga"
                    render={({ field }) => (
                      <Select onValueChange={field.onChange}>
                        <SelectTrigger className="bg-white text-black w-full">
                          <SelectValue placeholder="Select LGA" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="LGA1">LGA1</SelectItem>
                          <SelectItem value="LGA2">LGA2</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>

                <div className="flex flex-col">
                  <label className="mb-1 text-sm font-medium text-foreground">Ward</label>
                  <Input placeholder="Enter Ward" {...register("ward")} className="bg-white text-black" />
                </div>

                <div className="flex flex-col">
                  <label className="mb-1 text-sm font-medium text-foreground">Polling Unit Name</label>
                  <Input placeholder="Enter PU Name" {...register("pollingUnitName")} className="bg-white text-black" />
                </div>

                <div className="flex flex-col">
                  <label className="mb-1 text-sm font-medium text-foreground">Polling Unit Code</label>
                  <Input placeholder="e.g. 001" {...register("pollingUnitCode")} className="bg-white text-black" />
                </div>
              </div>
            </section>

            {/* Education & Employment */}
            <section className="bg-card p-4 rounded-lg">
              <h2 className="font-semibold text-lg mb-4 flex items-center gap-2 text-foreground">
                <span>🎓</span> Education & Employment
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label className="mb-1 text-sm font-medium text-foreground">Highest Qualification</label>
                  <Controller
                    control={control}
                    name="qualification"
                    render={({ field }) => (
                      <Select onValueChange={field.onChange}>
                        <SelectTrigger className="bg-white text-black w-full">
                          <SelectValue placeholder="Select Qualification" />
                        </SelectTrigger>
                        <SelectContent>
                          {QUALIFICATIONS.map(q => <SelectItem key={q} value={q}>{q}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>

                <div className="flex flex-col">
                  <label className="mb-1 text-sm font-medium text-foreground">Field of Study</label>
                  <Input placeholder="e.g. Political Science" {...register("fieldOfStudy")} className="bg-white text-black" />
                </div>

                <div className="flex flex-col">
                  <label className="mb-1 text-sm font-medium text-foreground">Employment Status</label>
                  <Controller
                    control={control}
                    name="employmentStatus"
                    render={({ field }) => (
                      <Select onValueChange={field.onChange}>
                        <SelectTrigger className="bg-white text-black w-full">
                          <SelectValue placeholder="Select Status" />
                        </SelectTrigger>
                        <SelectContent>
                          {EMPLOYMENT_STATUS.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>

                <div className="flex flex-col">
                  <label className="mb-1 text-sm font-medium text-foreground">Vocational / Artisan Trade</label>
                  <Input placeholder="If applicable (e.g. Tailoring)" {...register("vocationalTrade")} className="bg-white text-black" />
                </div>
              </div>
            </section>

            {/* Skills & Interests */}
            <section className="bg-card p-4 rounded-lg">
              <h2 className="font-semibold text-lg mb-4 flex items-center gap-2 text-foreground">
                <span>🎨</span> Skills & Interests
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium mb-2 text-foreground">Creative Skills</h3>
                  <div className="space-y-1">
                    {CREATIVE_SKILLS.map(skill => (
                      <label key={skill} className="flex items-center space-x-2">
                        <input type="checkbox" {...register("creativeSkills")} value={skill} className="accent-primary" />
                        <span className="text-foreground">{skill}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-2 text-foreground">Sports Interests</h3>
                  <div className="space-y-1">
                    {SPORTS_INTERESTS.map(sport => (
                      <label key={sport} className="flex items-center space-x-2">
                        <input type="checkbox" {...register("sportsInterests")} value={sport} className="accent-primary" />
                        <span className="text-foreground">{sport}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Engagement & Digital Presence */}
            <section className="bg-card p-4 rounded-lg">
              <h2 className="font-semibold text-lg mb-4 flex items-center gap-2 text-foreground">
                <span>🌐</span> Engagement & Digital Presence
              </h2>

              <div className="mb-4">
                <h3 className="font-medium mb-2 text-foreground">Leadership & Volunteer Interest</h3>
                <div className="flex flex-wrap gap-3">
                  {LEADERSHIP_INTERESTS.map(l => (
                    <label key={l} className="flex items-center space-x-2">
                      <input type="checkbox" {...register("leadershipInterests")} value={l} className="accent-primary" />
                      <span className="text-foreground">{l}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-2 text-foreground">Digital Platforms Used</h3>
                <div className="flex flex-wrap gap-3">
                  {DIGITAL_PLATFORMS.map(p => (
                    <label key={p} className="flex items-center gap-2 border border-border rounded-lg px-3 py-1 cursor-pointer hover:bg-card/30">
                      <input type="checkbox" {...register("digitalPlatforms")} value={p} className="accent-primary" />
                      <span className="text-foreground">{p}</span>
                    </label>
                  ))}
                </div>
              </div>
            </section>

            {/* Declaration */}
            <section className="bg-card p-4 rounded-lg">
              <label className="flex items-start space-x-2">
                <input type="checkbox" {...register("declaration")} className="accent-primary mt-1" />
                <span className="text-foreground text-sm">
                  Declaration: I hereby confirm that the information provided above is accurate and true to the best of my knowledge. I consent to be a member of the Central Zone Pilot of the Plateau Consensus Movement and agree to abide by its principles and objectives.
                </span>
              </label>
            </section>

            {/* Signature */}
            <section>
              <h3 className="font-medium mb-2 text-foreground">Signature</h3>
              <Input placeholder="Sign here..." {...register("signature")} className="bg-white text-black" />
            </section>

            {/* Buttons */}
            <div className="flex justify-end gap-4 mt-6">
              <Button type="button" variant="outline">Save Draft</Button>
              <Button type="submit" disabled={loading}>
                {loading ? "Submitting..." : "Submit Registration"}
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default CompleteProfile;