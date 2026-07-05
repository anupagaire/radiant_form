"use client";

import { useState, useEffect } from "react";
import { provinceData, getDistrictsByProvince, getMunicipalitiesByDistrict, getVdcsByDistrict } from "@/data/nepal-data";

interface LocationSelectProps {
  provinceName?: string;
  districtName?: string;
  municipalityName?: string;
  vdcName?: string;
  onProvinceChange?: (value: string) => void;
  onDistrictChange?: (value: string) => void;
  onMunicipalityChange?: (value: string) => void;
  onVdcChange?: (value: string) => void;
  className?: string;
}

export default function LocationSelect({
  provinceName = "province",
  districtName = "district",
  municipalityName = "municipality",
  vdcName = "vdc",
  onProvinceChange,
  onDistrictChange,
  onMunicipalityChange,
  onVdcChange,
  className = "",
}: LocationSelectProps) {
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedMunicipality, setSelectedMunicipality] = useState("");
  const [selectedVdc, setSelectedVdc] = useState("");
  const [districts, setDistricts] = useState<{ id: string; name: string }[]>([]);
  const [municipalities, setMunicipalities] = useState<{ id: string; name: string }[]>([]);
  const [vdcs, setVdcs] = useState<{ id: string; name: string }[]>([]);

  // Update districts when province changes
  useEffect(() => {
    if (selectedProvince) {
      const dists = getDistrictsByProvince(selectedProvince);
      setDistricts(dists);
      setSelectedDistrict("");
      setMunicipalities([]);
      setVdcs([]);
      setSelectedMunicipality("");
      setSelectedVdc("");
    } else {
      setDistricts([]);
      setSelectedDistrict("");
      setMunicipalities([]);
      setVdcs([]);
      setSelectedMunicipality("");
      setSelectedVdc("");
    }
  }, [selectedProvince]);

  // Update municipalities and VDCs when district changes
  useEffect(() => {
    if (selectedDistrict) {
      const munis = getMunicipalitiesByDistrict(selectedDistrict);
      setMunicipalities(munis);
      const vdcList = getVdcsByDistrict(selectedDistrict);
      setVdcs(vdcList);
      setSelectedMunicipality("");
      setSelectedVdc("");
    } else {
      setMunicipalities([]);
      setVdcs([]);
      setSelectedMunicipality("");
      setSelectedVdc("");
    }
  }, [selectedDistrict]);

  const handleProvinceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedProvince(value);
    if (onProvinceChange) onProvinceChange(value);
  };

  const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedDistrict(value);
    if (onDistrictChange) onDistrictChange(value);
  };

  const handleMunicipalityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedMunicipality(value);
    if (onMunicipalityChange) onMunicipalityChange(value);
  };

  const handleVdcChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedVdc(value);
    if (onVdcChange) onVdcChange(value);
  };

  const baseInputClass = "border border-gray-300 p-2 outline-none focus:border-blue-400 rounded text-[13px] w-full";

  // Check if we have any municipalities or VDCs to show
  const hasMunicipalities = municipalities.length > 0;
  const hasVdcs = vdcs.length > 0;

  return (
    <div className={`grid grid-cols-1 md:grid-cols-3 gap-2 ${className}`}>
      {/* Province Dropdown */}
      <div>
        <select
          name={provinceName}
          value={selectedProvince}
          onChange={handleProvinceChange}
          className={baseInputClass}
        >
          <option value="">Select Province</option>
          {provinceData.map((prov) => (
            <option key={prov.id} value={prov.id}>
              {prov.name}
            </option>
          ))}
        </select>
      </div>

      {/* District Dropdown */}
      <div>
        <select
          name={districtName}
          value={selectedDistrict}
          onChange={handleDistrictChange}
          className={baseInputClass}
          disabled={!selectedProvince}
        >
          <option value="">Select District</option>
          {districts.map((dist) => (
            <option key={dist.id} value={dist.id}>
              {dist.name}
            </option>
          ))}
        </select>
      </div>

      {/* Municipality/VDC Combined Dropdown */}
      <div>
        <select
          name={municipalityName}
          value={selectedMunicipality}
          onChange={handleMunicipalityChange}
          className={baseInputClass}
          disabled={!selectedDistrict}
        >
          <option value="">Select Municipality/VDC</option>
          
          {/* Municipalities Group */}
          {hasMunicipalities && (
            <optgroup label="Municipalities">
              {municipalities.map((muni) => (
                <option key={`muni_${muni.id}`} value={muni.id}>
                  🏙️ {muni.name}
                </option>
              ))}
            </optgroup>
          )}
          
          {/* VDCs Group */}
          {hasVdcs && (
            <optgroup label="VDCs (Village Development Committees)">
              {vdcs.map((vdc) => (
                <option key={`vdc_${vdc.id}`} value={vdc.id}>
                  🏘️ {vdc.name}
                </option>
              ))}
            </optgroup>
          )}
        </select>
      </div>
    </div>
  );
}